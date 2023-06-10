import type { User } from "@clerk/nextjs/dist/types/server"
import { clerkClient } from "@clerk/nextjs"
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc"
import { TRPCError } from "@trpc/server"
import axios, { type AxiosError } from "axios"
import { s3 } from "../../../aws-config.mjs"

type DalleResponse = {
  'data': {
    'data': [
      {
        'url': string
      }
    ]
  }
}

type ImageResponse = {
  'data': Buffer
}

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl
  }
}

export const imagesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.image.findMany({
      take: 100,
      orderBy: [
        {createdAt: "desc"}
      ]
    })
    return images
  }),

  // Should optimize to more easily get all of a user's images
  getAllUser: publicProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.image.findMany({
      take: 100,
      orderBy: [
        {createdAt: "desc"}
      ]
    })

    const users = ( 
      await clerkClient.users.getUserList({
        userId: images.map((image) => image.authorId),
        limit: 100
      })
    ).map(filterUserForClient)

    return images.map(image => {
      const author = users.find((user) => user.id === image.authorId)
      if (!author || !author.username) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for image not found"
        })
      }
      return {
        image
      }
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        prompt: z.string()
          .min(1, {message: "Prompt cannot be empty"})
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId
      const prompt = input.prompt
      // For testing purposes
      // const image = await ctx.prisma.image.findFirst({
      //   take: 1,
      //   orderBy: [
      //     {createdAt: "desc"}
      //   ]
      // })
      // return image
    // })
      
      if (!process.env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API key not found"
        })
      }
      
      // Define async func to upload to S3 bucket
      type uploadParams = {
        Bucket: string,
        Key: string,
        Body: Buffer
      }
      const uploadImage = (params: uploadParams) => {
        return new Promise((resolve, reject) => {
          s3.putObject(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      };

      try {
        // Make call to DALL-E
        const dalleResponse: DalleResponse = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024"
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
          }
        )
        const imageUrl = dalleResponse['data']['data'][0]['url']
        const imageResponse: ImageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        if (!imageResponse) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error downloading image from DALL-E"
          })
        }
        
        // Create a unique key for image
        const timeStamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const s3Key = `${timeStamp}-${randomString}.jpg`

        // Await S3 upload
        await uploadImage({
          Bucket: 'imagen-images',
          Key: s3Key,
          Body: imageResponse.data,
        })
        const s3Url = `https://imagen-images.s3.us-east-1.amazonaws.com/${s3Key}`
        console.log(s3Url)
        
        // Create db record and return
        const image = await ctx.prisma.image.create({
          data: {
            authorId: authorId,
            prompt: prompt,
            url: s3Url
          }
        })
        return image
      } catch {(error: AxiosError | Error) => {
        console.log(error)
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Something went wrong while generating the image. Please try again."
            })
          } else {
            console.log(error.message)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: error.message
            })
          }
        } else {
          console.log("Error generating image", error)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message
          })
        }
      }}
    })
})
