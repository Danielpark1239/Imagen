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

type ImageResponse = {
  'data': {
    'data': [
      {
        'url': string
      }
    ]
  }
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
        image,
        author: {
          ...author,
          username: author.username
        }
      }
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        prompt: z.string()
          .min(1, {message: "Prompt cannot be empty"})
          .max(500, {message: "Prompt cannot exceed 500 characters"})
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId
      const prompt = input.prompt
      
      if (!process.env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API key not found"
        })
      }

      try {
        // Make call to DALL-E
        const response: ImageResponse = await axios.post(
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
        const imageUrl = response['data']['data'][0]['url']
        const image = await ctx.prisma.image.create({
          data: {
            authorId,
            prompt: input.prompt,
            url: imageUrl
          }
        })
        console.log(image)
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
          console.error("Error generating image", error)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message
          })
        }
      }}
  })
})
