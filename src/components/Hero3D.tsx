import { useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const Hero3D = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 150,
        rotationX: -90,
        transformOrigin: 'center bottom',
        duration: 1.5,
        delay: 0.5,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            x: -100,
            duration: 1,
          },
          '-=0.8'
        )
        .from(
          taglineRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
          },
          '-=0.4'
        );

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -200,
        scale: 0.8,
        opacity: 0,
        rotationX: 45,
      });

      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -150,
        opacity: 0,
        x: 100,
      });

      gsap.to(taglineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0,
        scale: 1.2,
      });

      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        opacity: 0,
      });

      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background opacity-0 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary animate-gradient"
            style={{
              perspective: '1000px',
              textShadow: '0 0 80px rgba(0, 217, 255, 0.5), 0 0 120px rgba(255, 0, 255, 0.3)',
            }}
            animate={{
              textShadow: [
                '0 0 80px rgba(0, 217, 255, 0.5), 0 0 120px rgba(255, 0, 255, 0.3)',
                '0 0 100px rgba(255, 0, 255, 0.6), 0 0 140px rgba(0, 217, 255, 0.4)',
                '0 0 80px rgba(0, 217, 255, 0.5), 0 0 120px rgba(255, 0, 255, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Djimmy Allard
          </motion.h1>

          <motion.p
            ref={subtitleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-headline font-medium text-gradient-1"
            style={{
              textShadow: '0 0 40px rgba(0, 217, 255, 0.4)',
            }}
            animate={{
              opacity: [1, 0.8, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Développeur Web & SASS
          </motion.p>

          <p
            ref={taglineRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Pushing the boundaries of web experiences with 3D, animations, and cutting-edge technology
          </p>

          <div ref={ctaRef} className="flex gap-6 justify-center">
            <MagneticButton
              onClick={scrollToPortfolio}
              className="bg-gradient-1 text-white hover:opacity-90 font-normal text-lg px-16 py-8 h-auto rounded-full shadow-2xl shadow-primary/50 animate-glow"
            >
              Enter Experience
            </MagneticButton>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToPortfolio}
          className="text-foreground hover:text-primary transition-all hover:scale-110"
          aria-label="Scroll to portfolio"
        >
          <ChevronDownIcon size={56} strokeWidth={1.5} />
        </button>
      </motion.div>
    </section>
  );
};