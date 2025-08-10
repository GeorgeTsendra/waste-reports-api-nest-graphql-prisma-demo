FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

RUN pnpm prisma generate

COPY . .

RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3000

CMD sh -c "pnpm prisma generate && pnpm prisma migrate deploy && node dist/main.js"