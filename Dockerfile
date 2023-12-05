FROM oven/bun

WORKDIR /app
COPY bun.lockb .
RUN bun install 
RUN bun run prisma generate
COPY . . 

ENV NODE_ENV production

CMD ["bun","start"]

