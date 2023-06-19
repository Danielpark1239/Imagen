import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = createTRPCRouter({
  createCheckout10: protectedProcedure.mutation(async ({ ctx }) => {
    if (!process.env.HOST) {
      throw new Error("Missing Host")
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing Stripe Secret Key")
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    })
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      metadata: {
        userId: ctx.userId,
        credits: 10,
      },
      line_items: [{ price: process.env.STRIPE_10CREDIT_PRICE, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.HOST}/`,
      cancel_url: `${process.env.HOST}/buy`,
    })
    if (!checkoutSession) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        'message': 'Could not create checkout session'
      })
    }
    return checkoutSession.url
  }),
  createCheckout50: protectedProcedure.mutation(async ({ ctx }) => {
    if (!process.env.HOST) {
      throw new Error("Missing Host")
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing Stripe Secret Key")
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    })
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      metadata: {
        userId: ctx.userId,
        credits: 50,
      },
      line_items: [{ price: process.env.STRIPE_50CREDIT_PRICE, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.HOST}/`,
      cancel_url: `${process.env.HOST}/buy`,
    })
    if (!checkoutSession) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        'message': 'Could not create checkout session'
      })
    }
    return checkoutSession.url
  }),
  createCheckout100: protectedProcedure.mutation(async ({ ctx }) => {
    if (!process.env.HOST) {
      throw new Error("Missing Host")
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing Stripe Secret Key")
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    })
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "us_bank_account"],
      metadata: {
        userId: ctx.userId,
        credits: 100,
      },
      line_items: [{ price: process.env.STRIPE_100CREDIT_PRICE, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.HOST}/`,
      cancel_url: `${process.env.HOST}/buy`,
    })
    if (!checkoutSession) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        'message': 'Could not create checkout session'
      })
    }
    return checkoutSession.url
  }),
});