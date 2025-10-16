import { useScroll, useSpring, motion } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-1 origin-left z-[9999]"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-tertiary to-secondary origin-top z-[9999]"
        style={{ scaleY: scrollYProgress }}
      />
    </>
  );
};
