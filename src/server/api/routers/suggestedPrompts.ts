import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc"

export const suggestedPromptsRouter = createTRPCRouter({
  getRandom: publicProcedure.query(async ({ ctx }) => {
    const promptCount = await ctx.prisma.suggestedPrompt.count() - 1
    const randomPrompt = await ctx.prisma.suggestedPrompt.findMany({
      take: 1,
      skip: Math.floor(Math.random() * promptCount)
    })
    return randomPrompt[0]
  }),
})
