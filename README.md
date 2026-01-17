# GoMotion

AI-powered animation generation platform that transforms natural language instructions into production-grade video animations using Remotion.

## Tech Stack

- **Runtime**: Node.js v22+, TypeScript, Express.js 5.x
- **AI**: Vercel AI SDK, OpenRouter
- **Video**: Remotion 4.x, AWS Lambda (for rendering)
- **Animation**: GSAP, Three.js, React Three Fiber

## Installation

```bash
# Install dependencies
pnpm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
PORT=3000
```

For AWS Lambda rendering (optional):
```env
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
```

## Running

```bash
# Development (with auto-reload)
pnpm dev

# Production build
pnpm build
pnpm start

# Type checking
pnpm typecheck
```

## API Endpoints

### Create Animation

```bash
POST /api/animations
```

**JSON Body:**
```json
{
  "instruction": "Create a bouncing ball animation",
  "metadata": "width: 1080, height: 1920, fps: 30",
  "contextModel": "classic",
  "model": "anthropic/claude-sonnet-4",
  "apiKey": "sk-or-v1-..."
}
```

**With Images (FormData):**
```bash
curl -X POST http://localhost:3000/api/animations \
  -F "instruction=Create animation from these images" \
  -F "images=@image1.jpg" \
  -F "apiKey=sk-or-v1-..."
```

### Render Video

```bash
POST /api/render
```

### Check Progress

```bash
POST /api/progress
```

## Context Models

- **classic** - Minimalist editorial motion design with high-end aesthetics
- **creative** - Expressive and creative animation style
- **narrative** - Story-driven animations with audio support

## Project Structure

```
src/
├── index.ts              # Entry point
├── server.ts             # Express server & routes
├── g-zero/               # Core animation generation
│   ├── workflow.ts       # Main orchestrator
│   ├── agents/animator/  # AI animator agent
│   └── steps/            # Pipeline steps
└── lib/
    ├── remotion-renderer/  # Video rendering
    └── lambda/             # AWS Lambda integration
```

## Docker

```bash
# Build
docker build -t gomotion .

# Run
docker run -p 3000:3000 -e OPENROUTER_API_KEY=your_key gomotion
```

## License

Private
