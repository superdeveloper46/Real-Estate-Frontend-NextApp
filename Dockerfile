FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

FROM base AS builder

WORKDIR /app

ARG GOOGLE_MAP_API_KEY
ARG GOOGLE_MAP_API_URL
ARG MAPBOX_ACCESS_TOKEN
ARG BUYER_VIEW_API_URL
ARG STRIPE_API_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.js ./next.config.js
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./postcss.config.js ./postcss.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json

ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY $GOOGLE_MAP_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAP_API_URL $GOOGLE_MAP_API_URL
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN $MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_BUYER_VIEW_API_URL $BUYER_VIEW_API_URL
ENV NEXT_PUBLIC_STRIPE_API_KEY $STRIPE_API_KEY

RUN npm run build

FROM base AS runner

WORKDIR /app

ARG PORT

ENV NODE_ENV production
ENV PORT $PORT
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]
