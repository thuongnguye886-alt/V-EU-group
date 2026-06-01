import { motion } from 'motion/react';

const SKY_URL =
  'https://images.unsplash.com/photo-1493130952181-47e36589f64d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920';

interface CloudLayer {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  blur: number;
}

const layers: CloudLayer[] = [
  { id: 0, top: '10%', left: '-10%', size: 500, opacity: 0.55, duration: 60, delay: 0, blur: 2 },
  { id: 1, top: '30%', left: '-20%', size: 700, opacity: 0.45, duration: 80, delay: 10, blur: 4 },
  { id: 2, top: '55%', left: '-15%', size: 600, opacity: 0.35, duration: 70, delay: 5, blur: 3 },
  { id: 3, top: '5%', left: '-5%', size: 350, opacity: 0.6, duration: 50, delay: 15, blur: 1 },
  { id: 4, top: '70%', left: '-25%', size: 800, opacity: 0.3, duration: 90, delay: 20, blur: 6 },
];

interface SkySceneProps {
  onEnter?: () => void;
}

export const SkyScene = ({ onEnter }: SkySceneProps) => {
  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* Base sky photo */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      >
        <img
          src={SKY_URL}
          alt="Aerial clouds"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Bright veil that lifts to reveal the sky */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />

      {/* Slow drifting cloud layers */}
      {layers.map((l) => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            top: l.top,
            width: l.size,
            height: l.size * 0.4,
            background:
              'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.5) 50%, transparent 80%)',
            filter: `blur(${l.blur * 10}px)`,
            opacity: l.opacity,
          }}
          initial={{ left: l.left }}
          animate={{ left: '120%' }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Blue atmospheric haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(135,206,250,0.15) 0%, transparent 50%, rgba(100,149,237,0.1) 100%)',
        }}
      />

      {/* Sun glow */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,240,180,0.5) 0%, rgba(255,220,100,0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Welcome overlay with Enter button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
          className="text-center px-8"
        >
          <motion.p
            className="text-sky-900/70 text-sm tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Veu Travel
          </motion.p>
          <motion.h1
            className="text-slate-800 text-4xl font-bold mb-4"
            style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.9, ease: 'easeOut' }}
          >
            Your Journey Begins
          </motion.h1>
          <motion.p
            className="text-slate-600/80 max-w-sm mx-auto text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            The world is waiting for you — above the clouds and beyond.
          </motion.p>

          <motion.button
            onClick={onEnter}
            className="mt-8 px-8 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 text-slate-700 hover:bg-white/80 transition-all duration-300 cursor-pointer font-medium"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          >
            Explore destinations →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
