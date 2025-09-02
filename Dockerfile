# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22
ARG PNPM_VERSION=10

########## build stage ##########
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the project with tsc
RUN pnpm run build

########## runtime stage ##########
FROM node:${NODE_VERSION}-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /srv

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates wget xdg-utils fonts-liberation \
  libasound2 libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 \
  libc6 libcairo2 libcups2 libdbus-1-3 libdrm2 libexpat1 \
  libfontconfig1 libgbm1 libglib2.0-0 libgdk-pixbuf-2.0-0 \
  libgtk-3-0 libnspr4 libnss3 libx11-6 libx11-xcb1 libxcb1 \
  libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 \
  libxrender1 libxshmfence1 libxkbcommon0 libxi6 libxtst6 libxss1 \
  && rm -rf /var/lib/apt/lists/*

# Copy everything including node_modules and dist
COPY --from=build /app ./

# Set environment variables
ENV PORT=3000
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]