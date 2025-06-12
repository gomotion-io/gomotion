/* ----------------- Particle burst animation with colorful particles ----------------- */
export const particle_burst_example = () => ({
  metadata: {
    width: 1920,
    height: 1080,
    fps: 60,
    duration_in_frames: 300,
  },
  tsx: `const React = window.React;
const R = window.Remotion;

export const GeneratedComp: React.FC = () => {
  const frame = R.useCurrentFrame();
  const { fps } = R.useVideoConfig();
  
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 2 * Math.PI;
    const distance = R.spring({
      frame: frame - 60,
      fps,
      config: { damping: 15, stiffness: 200 },
    }) * 300;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    const opacity = R.interpolate(frame, [60, 100, 200, 240], [0, 1, 1, 0], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });
    
    return { x, y, opacity, angle: angle * (180 / Math.PI) };
  });

  // Text animation
  const textScale = R.spring({
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
          hello world
        </h1>
      </div>
    </div>
  );
};

export default GeneratedComp;`,
});
