# Tesla

A monitoring dashboard for my Tesla, Hello Panda.

![screenshot](/public/screenshot.png)

## Preamble

I got tired of refreshing my Teslascope page to check my vehicle charge status. I wanted to put it on a monitor dedicated to that one thing -- displaying my charging status. I therefore built a dashboard that refreshes automatically every 5 minutes. It happens to include other useful information too, which I couldn't resist since the data was being returned by Tesla anyway.

## Tesla API

Tesla's API is [documented unofficially](https://tesla-api.timdorr.com) by enthusiasts. Amazingly, it works.

I already have an OAuth token generated for Teslascope. So it was easy for me to add it in as a bearer token with each request. In future I will integrate the actual OAuth flow.

## Getting Started

By the way, this is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Follow the instructions to install on that page.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### The Frontend

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file. All vehicle data is beautified in `pages/vehicle.js`, which is imported as a child component within the main index page.

### The Backend

The Tesla API is called in the backend of the API router so as to obfuscate the calling credentials and response (don't want VIN numbers exposed too). This [API route](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/vehicle](http://localhost:3000/api/vehicle). This endpoint can be edited in `pages/api/vehicle.js`.

In general, the `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Caching

I used Redis (`ioredis`) to cache the results from my vehicle. You see, everytime my vehicle goes to sleep to save power, no data is returned. As such, each time the dashboard is visited and a request is made, I need to wake the vehicle. I have set a cache expiration of 5 minutes to prevent my car from being caffeinated and losing valuable charge.

Locally, to test, I use a prebuilt docker image to host my Redis cache, which can be setup using the following

```
docker run -p 6379:6379 --name tesla -d redis redis-server --appendonly yes
```

In Preview (dev) and Prod, Vercel comes built in with an integration with [Upstash](https://upstash.com) which I use for serverless Redis.

#### Syncing Data

Data is loaded on the frontend using [SWR](https://swr.vercel.app), a HTTP cache invalidation library. I chose this because it is spankingly easy to setup. It also allows me to refresh every 5 minutes as long as the page is still active without me having to write complex code.

The code handling this is found in `src/useVehicle.js`.

#### Filtering Data

Important! Tesla API returns valuable information about the vehicle including VIN number and location. Ensure that the frontend receiving the data is not exposing the backend's full response in the developer console. I used a flag `essentialOnly = true` in `getVehicleData()` in `api/vehicle.js` to apply a filter `filterVehicleData()` to map only the required fields my frontend needs.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
