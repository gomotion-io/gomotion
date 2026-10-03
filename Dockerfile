# Use the official Node.js 24 (LTS) Alpine image as the base
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally, pinned to the version in package.json "packageManager"
RUN npm install -g pnpm@12.8.1

# Copy the project manifest and pnpm approval config before installing dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies using pnpm with the required native build approvals in place
RUN pnpm install --frozen-lockfile

# Set build-time environment variables for Next.js
ARG NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL

ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

ARG NEXT_PUBLIC_MIXPANEL_TOKEN
ENV NEXT_PUBLIC_MIXPANEL_TOKEN=$NEXT_PUBLIC_MIXPANEL_TOKEN

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
