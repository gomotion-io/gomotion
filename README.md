# Gomotion

Gomotion is a research-led motion–animation video generation platform. It leverages **Next.js** (App Router + React Server Components), **Supabase**, **Remotion**, and **Mastra** to create animated videos from a single prompt – compressing hours of After Effects work into seconds.

> "From idea ✏️ → to motion 🎞️ → in seconds ⚡️"

The goal of the project is to fine-tune an LLM to write **Remotion** compositions, orchestrated by an agentic workflow, and expose it behind a user-friendly web experience.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
   3. [Environment Variables](#environment-variables)
   4. [Development](#development)
   5. [Production Build](#production-build)
5. [Supabase](#supabase)
6. [npm Scripts](#npm-scripts)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

• ✨ Generate motion-graphic videos from a text prompt  
• 🧩 Agentic workflow powered by **Mastra**  
• 🎞️ Server-side rendering of videos using **Remotion**  
• ☁️ Authentication, Postgres and Storage through **Supabase**  
• 💳 Subscription & payments handled by **LemonSqueezy**  
• 🗣️ Voice-over generation with **ElevenLabs**  
• 🏄‍♂️ Smooth front-end animations using **GSAP** + **React-Three-Fiber**  
• 🧪 Type-safe codebase written in **TypeScript** & linted with **ESLint/Prettier**

---

## Tech Stack

| Layer        | Tech                                                           |
| ------------ |----------------------------------------------------------------|
| Front-end    | Next.js 15 (App Router), React 19, Tailwind CSS 4, ShadCN UI   |
| Backend      | Next.js **Route Handlers** (serverless), Supabase Edge Functions |
| Database     | Supabase Postgres, Row-Level Security (RLS)                    |
| Video Render | Remotion 4, FFmpeg                                             |
| AI / LLM     | OpenAI + Mastra                                       |
| Animations   | GSAP, React-Three-Fiber, Drei                                  |
| Payments     | LemonSqueezy.js 4                                              |
| State Mgmt   | Zustand                                                        |

---

## Project Structure

```
src/
  app/            // Next.js route handlers & pages (App Router)
  components/     // Re-usable UI & domain components
  gomotion-compiler/ // Remotion compositions & helpers
  store/          // Zustand stores (state management)
  supabase/       // Supabase client & server utilities
  types/          // Global TypeScript declarations
public/           // Static assets (images, models, fonts)
```

> **Tip**: The full tree is visible in the repository root if you need deeper inspection.

---

## Getting Started

### Prerequisites

1. **Node.js** ≥ 20 (check with `node -v`)
2. **npm** ≥ 10 (or **pnpm**/**yarn** if you prefer)
3. A Supabase project (free tier is fine)
4. API keys for the external services you plan to use (see below).

### Installation

```bash
# clone the repo
$ git clone https://github.com/<your-org>/gomotion.git
$ cd gomotion

# install dependencies
$ npm install
```

### Environment Variables

Create a `.env.local` file in the project root (ignored by git) and add the following keys:

```env
# ───────── Front-end ─────────
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_BETA=false            # set to 'true' to hide pricing & replace CTAs with "Contact us"

# ───────── Server-side only ─────────
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>

# LemonSqueezy (payments)
LEMONSQUEEZY_API_KEY=<lemon-api-key>
LEMONSQUEEZY_STORE_ID=<store-id>
LEMONSQUEEZY_SIGNATURE_SECRET=<signature-secret>

# ElevenLabs (voice-over)
ELEVENLABS_API_KEY=<elevenlabs-api-key>

# Mastra (workflow engine)
MASTRA_URL=<mastra-base-url>
```

> **Important**: Never commit secrets to git. `.env*` files are in the `.gitignore` by default.

### Development

Start the dev server with hot-reload:

```bash
$ npm run dev
```

Visit `http://localhost:3000` to view the app.

### Production Build

```bash
# create an optimized production build
$ npm run build

# start the server
$ npm start
```

---

## Supabase

1. Create a new Supabase project and copy the URL + anon/service keys into `.env.local`.
2. Link the project locally (optional):

```bash
$ npx supabase link --project-ref <project-ref>
```

3. Whenever the database schema changes, regenerate TypeScript types:

```bash
$ npm run supabase-gen
```

The script executes:

```bash
npx supabase gen types typescript \
  --project-id <project-ref> \
  --schema public \
  > src/supabase/generated/database.types.ts
```

---

## npm Scripts

| Script         | Description                       |
| -------------- | --------------------------------- |
| `dev`          | Start Next.js in development mode |
| `build`        | Create a production build         |
| `start`        | Launch the production server      |
| `lint`         | Run ESLint with Next.js config    |
| `typecheck`    | Run TypeScript in `--noEmit` mode |
| `supabase-gen` | Regenerate Supabase DB types      |

---

## Contributing

We welcome issues and pull requests! To contribute:

1. Fork the repository & create your branch: `git checkout -b feat/amazing-thing`
2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
3. Push the branch and open a Pull Request.
4. Make sure `npm run lint` & `npm run typecheck` pass.
5. A reviewer will merge after approval & CI passes.

Feel free to open **Discussions** for questions or ideas.

---

## License

This project is licensed under the **MIT License**.
