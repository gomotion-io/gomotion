import { FileSystemTree } from "@webcontainer/api";

export const srcfiles: FileSystemTree = {
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
      <h1 style={{ fontSize: 60, color: "#ffffff" }}>Hello Gomotion</h1>
    </AbsoluteFill>
  );
};`,
        },
      },
    },
  },
};
