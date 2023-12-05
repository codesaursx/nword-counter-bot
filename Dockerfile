FROM oven/bun

WORKDIR /app
COPY package.json .
COPY bun.lockb .
COPY ./prisma ./prisma
RUN bun install --production
RUN npx prisma generate
COPY . . 

ENV NODE_ENV production

CMD ["bun","start"]

