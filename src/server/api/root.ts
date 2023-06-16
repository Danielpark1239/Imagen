import { imagesRouter } from "~/server/api/routers/images"
import { suggestedPromptsRouter } from "~/server/api/routers/suggestedPrompts"
import { checkoutRouter } from "~/server/api/routers/checkout";
import { stripeUserRouter } from "~/server/api/routers/stripeUser";
import { createTRPCRouter } from "~/server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  images: imagesRouter,
  suggestedPrompts: suggestedPromptsRouter,
  checkout: checkoutRouter,
  stripeUser: stripeUserRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
