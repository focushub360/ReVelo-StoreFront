# ReVelo Storefront

The public storefront is a standalone Vite app. It displays searchable, sale-ready vehicles from active ReVelo dealerships. Checkout and dealer contact are intentionally not included yet.

## Local development

From this directory, install dependencies and run `npm run dev`. The Vite development server proxies `/api/v1` requests to the shared ReVelo backend at `https://revelo-backend-wll7.onrender.com`.

## Vercel deployment

Create a separate Vercel project using `Storefront/` as its root directory. The Vercel rewrite proxies `/api/v1/*` to the shared backend, so this app deploys on its own domain without a separate API deployment.
