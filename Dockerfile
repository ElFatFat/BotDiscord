FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --production

COPY src ./src

CMD ["bun", "run", "clear-global-commands.js"]
CMD ["bun", "run", "deploy-commands.js"]
CMD ["bun", "run", "src/bot.js"]
