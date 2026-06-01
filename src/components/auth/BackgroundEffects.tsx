import { motion } from 'motion/react';
import { useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface LightRay {
  id: number;
  x: number;
  angle: number;
  width: number;
  duration: number;
  delay: number;
}

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2,
  }));

const generateRays = (count: number): LightRay[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    angle: -15 + Math.random() * 30,
    width: Math.random() * 80 + 40,
    duration: Math.random() * 6 + 8,
    delay: Math.random() * 4,
  }));

export const BackgroundEffects = () => {
  const [particles] = useState(() => generateParticles(35));
  const [rays] = useState(() => generateRays(5));

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Light rays from cave opening */}
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-0"
          style={{
            left: `${ray.x}%`,
            width: `${ray.width}px`,
            height: '70%',
            background:
              'linear-gradient(to bottom, rgba(52,211,153,0.06) 0%, rgba(52,211,153,0.02) 60%, transparent 100%)',
            transform: `rotate(${ray.angle}deg)`,
            transformOrigin: 'top center',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: ray.duration,
            delay: ray.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating firefly particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              p.id % 3 === 0
                ? 'rgba(52,211,153,0.9)'
                : p.id % 3 === 1
                  ? 'rgba(255,255,255,0.8)'
                  : 'rgba(110,231,183,0.7)',
            boxShadow:
              p.id % 3 === 0
                ? '0 0 6px 2px rgba(52,211,153,0.6)'
                : '0 0 4px 1px rgba(255,255,255,0.4)',
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, 0],
            y: [0, -20 - Math.random() * 40, -10, 0],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.5, 1.2, 0.8, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Mist / fog layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background:
            'linear-gradient(to top, rgba(0,30,15,0.4) 0%, rgba(0,60,30,0.1) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(52,211,153,0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scaleX: [1, 1.3, 0.9, 1],
          opacity: [0.6, 1, 0.7, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={`mist-${i}`}
          className="absolute"
          style={{
            bottom: `${10 + i * 8}%`,
            width: `${300 + i * 100}px`,
            height: '80px',
            background:
              'radial-gradient(ellipse, rgba(200,240,220,0.06) 0%, transparent 70%)',
            filter: 'blur(25px)',
            left: `-${i * 5}%`,
          }}
          animate={{ x: ['0%', '120%'] }}
          transition={{
            duration: 25 + i * 8,
            delay: i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(4,120,87,0.2), transparent)',
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
