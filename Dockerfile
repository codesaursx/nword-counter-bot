FROM oven/bun

WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install --production
COPY . . 
RUN bun run prisma generate

ENV NODE_ENV production

CMD ["bun","start"]

