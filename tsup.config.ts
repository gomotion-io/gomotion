import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  platform: 'node',
  target: 'node18',
  outDir: 'dist',
  bundle: true,
  minify: false,
  sourcemap: true,
  clean: true,
  dts: false,
  external: [
    // Exclude problematic optional dependencies
    'uglify-js',
    '@swc/core',
    'terser',
    'webpack'
  ],
  noExternal: [
    // Force bundle these main dependencies
    '@openrouter/ai-sdk-provider',
    'ai',
    'express',
    'zod',
    'dotenv',
    'gsap',
    'nanoid',
    'openai',
    'react',
    'react-dom',
    'remotion',
    'three',
    '@react-three/drei',
    '@react-three/fiber',
    // Add all Remotion packages
    '@remotion/bundler',
    '@remotion/renderer',
    '@remotion/animation-utils',
    '@remotion/captions',
    '@remotion/fonts',
    '@remotion/gif',
    '@remotion/google-fonts',
    '@remotion/lambda',
    '@remotion/lambda-client',
    '@remotion/layout-utils',
    '@remotion/noise',
    '@remotion/openai-whisper',
    '@remotion/paths',
    '@remotion/player',
    '@remotion/shapes',
    '@remotion/three',
    '@remotion/transitions',
    '@remotion/zod-types'
  ],
  treeshake: true,
  splitting: false,
  esbuildOptions(options) {
    options.bundle = true
    options.platform = 'node'
    options.target = 'node18'
    options.ignoreAnnotations = true
  }
})
