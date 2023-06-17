import { appRouter } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

export const config = { // Use Vercel edge runtime since image api sometimes times out
  runtime: 'edge',
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
//     env.NODE_ENV === "development"
//       ? ({ path, error }) => {
//           console.error(
//             `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
//           );
//         }
//       : undefined,
// });