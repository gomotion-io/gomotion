ARG NODE_VERSION=22
ARG PNPM_VERSION=10

########## build stage ##########
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app

RUN npm i -g pnpm@${PNPM_VERSION}
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

RUN npx remotion browser ensure

COPY . .
RUN pnpm run build

########## runtime stage ##########
FROM node:${NODE_VERSION}-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /srv

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates wget xdg-utils fonts-liberation fonts-noto-color-emoji fonts-noto-cjk \
  libasound2 libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 \
  libc6 libcairo2 libcups2 libdbus-1-3 libdrm2 libexpat1 \
  libfontconfig1 libgbm1 libglib2.0-0 libgdk-pixbuf-2.0-0 \
  libgtk-3-0 libnspr4 libnss3 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 \
  libxrender1 libxshmfence1 libxkbcommon0 libxi6 libxtst6 libxss1 \
  libpango-1.0-0 \
  && rm -rf /var/lib/apt/lists/* && apt-get clean

COPY --from=build /app ./

ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]
