import { useEffect, useRef } from 'react';
import { Code2Icon, PaletteIcon, ZapIcon, LayersIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { icon: Code2Icon, labelKey: 'about.tech.react', color: 'text-primary' },
  { icon: PaletteIcon, labelKey: 'about.tech.design', color: 'text-tertiary' },
  { icon: ZapIcon, labelKey: 'about.tech.animations', color: 'text-secondary' },
  { icon: LayersIcon, labelKey: 'about.tech.threeD', color: 'text-accent' },
];

export const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(techRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: techRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 lg:py-48 bg-gradient-2"
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/20">
              <img
                src="/profile.jpg"
                alt="Portrait de Djimmy Allard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-1 opacity-20 blur-3xl rounded-full" />
          </div>

          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
                {t('about.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-1" />
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                {t('about.description1')}
              </p>
              <p>
                {t('about.description2')}
              </p>
            </div>

            <div ref={techRef} className="grid grid-cols-2 gap-6 pt-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <tech.icon size={32} strokeWidth={1.5} className={tech.color} />
                  <span className="text-foreground font-medium">{t(tech.labelKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
