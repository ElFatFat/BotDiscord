FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --production

COPY . .

CMD ["bun", "run", "clear-global-commands.js"]
CMD ["bun", "run", "deploy-commands.js"]
CMD ["bun", "run", "index.ts"]
