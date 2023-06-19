<<<<<<< HEAD
import { appRouter } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"
// import { createNextApiHandler } from "@trpc/server/adapters/next";

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

export const config = { // Use Vercel edge runtime since image api sometimes times out
  runtime: 'edge',
  unstable_allowDynamic:'*' // just testing
};

// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: createTRPCContext,
  });
}

// export default createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
//   onError:
//     ({ path, error }) => {
//         console.error(
//           `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
//         );
//       }
// })
=======
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
>>>>>>> parent of 5eb74d9 (Try putting trpc on the edge)
