# Imagen

Imagen is a SaaS project that allows users to create AI-generated images through OpenAI’s DALLE model. 

It's currently hosted at [ima-gen.vercel.app](https://ima-gen.vercel.app), and is deployed using the following: Vercel, AWS S3, Planetscale, Stripe, and Clerk. 

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.


# To run (assuming you have the env vars):
```
yarn
yarn run dev
yarn run stripe:listen
```