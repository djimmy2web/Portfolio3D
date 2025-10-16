import { useEffect, useRef, useState } from 'react';
import { Code2Icon, PaletteIcon, ZapIcon, LayersIcon, DatabaseIcon, ServerIcon, CloudIcon, GitBranchIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/TextReveal';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { icon: Code2Icon, labelKey: 'about.tech.react', color: '#00d9ff', delay: 0 },
  { icon: PaletteIcon, labelKey: 'about.tech.design', color: '#ff00ff', delay: 0.1 },
  { icon: ZapIcon, labelKey: 'about.tech.animations', color: '#00ff88', delay: 0.2 },
  { icon: LayersIcon, labelKey: 'about.tech.threeD', color: '#ffaa00', delay: 0.3 },
];

const backendStack = [
  { icon: DatabaseIcon, labelKey: 'about.backend.database', color: '#ff6b6b', delay: 0 },
  { icon: ServerIcon, labelKey: 'about.backend.api', color: '#4ecdc4', delay: 0.1 },
  { icon: CloudIcon, labelKey: 'about.backend.cloud', color: '#45b7d1', delay: 0.2 },
  { icon: GitBranchIcon, labelKey: 'about.backend.devops', color: '#96ceb4', delay: 0.3 },
];

export const About3D = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        rotationY: 10,
      });

      // Parallax for content
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -80,
      });

      // Stagger animation for tech stack
      const techItems = techRef.current?.children;
      if (techItems) {
        Array.from(techItems).forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            rotationX: 90,
            scale: 0.5,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
          });
        });
      }

      // Stagger animation for backend stack
      const backendItems = backendRef.current?.children;
      if (backendItems) {
        Array.from(backendItems).forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            rotationX: 90,
            scale: 0.5,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-48 lg:py-64 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          style={{ top: '33%', right: '25%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-tertiary/30 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 80,
            y: -mousePosition.y * 80,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          style={{ bottom: '33%', left: '25%' }}
        />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-start">
          <motion.div
            ref={imageRef}
            className="relative perspective-1000"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 transform-gpu"
              animate={{
                rotateY: mousePosition.x * 10 - 5,
                rotateX: -mousePosition.y * 10 + 5,
              }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <img
                src="/profile.jpg"
                alt="Portrait de Djimmy Allard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-1 opacity-30 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-12 -left-12 w-80 h-80 bg-tertiary opacity-20 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          <div ref={contentRef} className="space-y-10">
            <div className="space-y-6">
              <motion.h2
                className="text-6xl md:text-7xl lg:text-8xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {t('about.title')}
              </motion.h2>
              <motion.div
                className="w-32 h-2 bg-gradient-1 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>

            <div className="space-y-8 text-muted-foreground text-xl leading-relaxed">
              <TextReveal className="text-2xl font-medium text-foreground" delay={0.3}>
                {t('about.description1')}
              </TextReveal>
              <TextReveal delay={0.5}>
                {t('about.description2')}
              </TextReveal>
            </div>

            <div ref={techRef} className="grid grid-cols-2 gap-6 pt-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="group relative flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 transform-gpu cursor-pointer"
                  style={{
                    boxShadow: `0 10px 40px ${tech.color}20`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: `0 20px 60px ${tech.color}40`,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: tech.delay }}
                  viewport={{ once: true }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"
                    style={{ backgroundColor: `${tech.color}20` }}
                  />
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <tech.icon
                      size={32}
                      strokeWidth={1.5}
                      style={{ color: tech.color }}
                      className="relative z-10"
                    />
                  </motion.div>
                  <span className="text-foreground font-semibold text-base relative z-10">
                    {t(tech.labelKey)}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Backend Technologies Section */}
            <div className="pt-8">
              <motion.h3
                className="text-2xl font-headline font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('about.backendTitle')}
              </motion.h3>
              <div ref={backendRef} className="grid grid-cols-2 gap-6">
                {backendStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 transform-gpu cursor-pointer"
                    style={{
                      boxShadow: `0 10px 40px ${tech.color}20`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      boxShadow: `0 20px 60px ${tech.color}40`,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: tech.delay }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"
                      style={{ backgroundColor: `${tech.color}20` }}
                    />
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <tech.icon
                        size={32}
                        strokeWidth={1.5}
                        style={{ color: tech.color }}
                        className="relative z-10"
                      />
                    </motion.div>
                    <span className="text-foreground font-semibold text-base relative z-10">
                      {t(tech.labelKey)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
