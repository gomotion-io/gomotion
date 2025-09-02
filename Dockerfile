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

# Copy everything including node_modules and dist
COPY --from=build /app ./

# Set environment variables
ENV PORT=3000
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]