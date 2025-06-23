import { FileSystemTree } from "@webcontainer/api";

export const files: FileSystemTree = {
  "index.html": {
    file: {
      contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Vite App</title>
    <style>
      html,body,#root{
        margin:0;
        padding:0;
        width:100%;
        height:100%;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    },
  },
  "package.json": {
    file: {
      contents: `{
  "name": "react-vite-ts-app",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "vite --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@remotion/player": "^4.0.0",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.0.3",
    "typescript": "^5.4.0"
  }
}`,
    },
  },
  "tsconfig.json": {
    file: {
      contents: `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`,
    },
  },
  "vite.config.ts": {
    file: {
      contents: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
    },
  },
  src: {
    directory: {
      "main.tsx": {
        file: {
          contents: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        },
      },
      "App.tsx": {
        file: {
          contents: `import React from 'react';
import { Player } from '@remotion/player';
import { HelloWorld } from './HelloWorld';

const App: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <Player
        component={HelloWorld}
        durationInFrames={60}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default App;`,
        },
      },
      "HelloWorld.tsx": {
        file: {
          contents: `import React from 'react';
import { AbsoluteFill } from 'remotion';

export const HelloWorld: React.FC = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: 60 }}>Hello World</h1>
    </AbsoluteFill>
  );
};`,
        },
      },
      "vite-env.d.ts": {
        file: {
          contents: `/// <reference types="vite/client" />`,
        },
      },
    },
  },
};
