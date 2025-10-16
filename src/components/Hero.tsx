import { useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: 'center bottom',
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          taglineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
          },
          '-=0.3'
        );
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
      <div className="absolute inset-0 z-0">
        <motion.video
          alt="developer abstract video"
          src="https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_1.mp4"
          poster="https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_1-poster.png"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-foreground"
            style={{ perspective: '1000px' }}
          >
            Djimmy Allard
          </h1>

          <p
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-headline font-medium text-primary"
          >
            {t('hero.subtitle')}
          </p>

          <p
            ref={taglineRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t('hero.description')}
          </p>

          <div ref={ctaRef}>
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal text-base px-12 py-6 h-auto"
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={scrollToPortfolio}
          className="text-foreground hover:text-primary transition-colors cursor-pointer"
          aria-label="Scroll to portfolio"
        >
          <ChevronDownIcon size={48} strokeWidth={1.5} className="animate-bounce-arrow" />
        </button>
      </div>
    </section>
  );
};
