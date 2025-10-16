import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MorphingShape = () => {
  const shapes = [
    'M50,10 L90,90 L10,90 Z', // Triangle
    'M10,50 Q10,10 50,10 Q90,10 90,50 Q90,90 50,90 Q10,90 10,50 Z', // Circle
    'M10,10 L90,10 L90,90 L10,90 Z', // Square
    'M50,10 L70,40 L90,50 L70,60 L50,90 L30,60 L10,50 L30,40 Z', // Star
  ];

  return (
    <div className="fixed top-1/2 right-10 -translate-y-1/2 z-0 opacity-20 pointer-events-none hidden lg:block">
      <svg width="200" height="200" viewBox="0 0 100 100">
        <motion.path
          d={shapes[0]}
          fill="url(#morphGradient)"
          animate={{
            d: shapes,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
