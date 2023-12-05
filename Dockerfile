FROM oven/bun

WORKDIR /app
COPY . . 
RUN bun install --production
RUN bun prisma generate

ENV NODE_ENV production

CMD ["bun", "start"]

