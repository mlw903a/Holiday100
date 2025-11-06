import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { generateTrendData, generateBatchTrendData } from "./trendSimulator";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  trends: router({
    // Get trend data for a single product
    getProductTrend: publicProcedure
      .input(z.object({ productName: z.string(), productId: z.number() }))
      .query(async ({ input }) => {
        return generateTrendData(input.productName, input.productId);
      }),

    // Get trend data for multiple products
    getBatchTrends: publicProcedure
      .input(z.object({ products: z.array(z.object({ id: z.number(), name: z.string() })) }))
      .mutation(async ({ input }) => {
        return generateBatchTrendData(input.products);
      }),
  }),
});

export type AppRouter = typeof appRouter;
