FROM oven/bun AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/deps
COPY package.json bun.lockb /temp/deps
RUN cd /temp/deps && bun install --frozen-lockfile

FROM base AS release
COPY --from=install /temp/deps/node_modules node_modules
COPY package.json .
COPY . .
RUN bun run prisma generate

ENV NODE_ENV production

CMD ["bun","start"]