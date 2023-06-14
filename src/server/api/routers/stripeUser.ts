import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const stripeUserRouter = createTRPCRouter({
  getCredits: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.stripeUser.findFirst({
      where: {
        clerkID: ctx.userId
      },
    })
    // If user doesn't exist, create one with 1 credit
    if (!user) {
      await ctx.prisma.stripeUser.create({
        data: {
          clerkID: ctx.userId,
          credits: 1
        }
      })
      return 1
    }
    return user.credits
  }),

  decrementCredits: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.stripeUser.findFirst({
      where: {
        clerkID: ctx.userId
      }
    })
    if (!user || !user.credits) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Stripe user not found"
      })
    }
    if (user.credits <= 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User has no credits"
      })
    }
    await ctx.prisma.stripeUser.update({
      where: {
        clerkID: ctx.userId
      },
      data: {
        credits: {
          decrement: 1
        }
      }
    })
  })
})