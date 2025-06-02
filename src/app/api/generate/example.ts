/* ----------------- Particle burst animation with colorful particles ----------------- */
export const particle_burst_example = (input: string) => ({
  metadata: {
    comp_with: 1920,
    comp_height: 1080,
    fps: 60,
    duration_in_frames: 300,
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 2 * Math.PI;
    const distance = spring({
      frame: frame - 60,
      fps,
      config: { damping: 15, stiffness: 200 },
    }) * 300;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    const opacity = interpolate(frame, [60, 100, 200, 240], [0, 1, 1, 0], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    
    return { x, y, opacity, angle: angle * (180 / Math.PI) };
  });

  // Text animation
  const textScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 300 },
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0a0a0a',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: \`hsl(\${index * 18}, 80%, 60%)\`,
            transform: \`translate(\${particle.x}px, \${particle.y}px)\`,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      {/* Central text */}
      <div style={{
        textAlign: 'center',
        transform: \`scale(\${textScale})\`,
        zIndex: 10,
      }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}>
          ${input}
        </h1>
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});

/* ----------------- Morphing shapes with color cycling ----------------- */
export const morphing_shapes_example = (input: string) => ({
  metadata: {
    comp_with: 1920,
    comp_height: 1080,
    fps: 60,
    duration_in_frames: 360,
  },
  tsx: `import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';

export const GeneratedComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Morphing animation for shapes
  const morphProgress = interpolate(frame, [0, 180, 360], [0, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  
  const borderRadius = interpolate(morphProgress, [0, 1], [0, 50]);
  const rotation = interpolate(frame, [0, 360], [0, 720]);
  
  // Color cycling
  const hue = interpolate(frame, [0, 360], [0, 360]);
  
  // Spring animation for text
  const textSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: \`radial-gradient(circle, hsl(\${hue}, 30%, 10%) 0%, hsl(\${hue + 60}, 20%, 5%) 100%)\`,
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Morphing background shapes */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 200 - i * 30,
            height: 200 - i * 30,
            borderRadius: \`\${borderRadius + i * 10}%\`,
            border: \`2px solid hsla(\${hue + i * 72}, 70%, 60%, 0.3)\`,
            transform: \`rotate(\${rotation + i * 72}deg)\`,
            animation: 'none',
          }}
        />
      ))}
      
      {/* Animated text */}
      <Sequence from={60}>
        <div style={{
          textAlign: 'center',
          transform: \`scale(\${textSpring}) rotate(\${rotation * 0.1}deg)\`,
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: \`hsl(\${hue}, 80%, 90%)\`,
            margin: 0,
            textShadow: \`0 0 30px hsl(\${hue}, 80%, 60%)\`,
            letterSpacing: '2px',
          }}>
            ${input}
          </h1>
        </div>
      </Sequence>
    </div>
  );
};

export default GeneratedComp;`,
});
