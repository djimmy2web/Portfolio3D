import { useEffect, useRef } from 'react';
import { Code2Icon, LayersIcon, ServerIcon, PaletteIcon, ZapIcon, GlobeIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2Icon,
    titleKey: 'services.saas.title',
    descriptionKey: 'services.saas.description',
    features: [
      'Architecture microservices',
      'Gestion des utilisateurs et rôles',
      'Système de facturation automatisé',
      'Analytics et tableaux de bord',
      'APIs REST/GraphQL robustes',
      'Intégrations tierces'
    ],
    color: '#00d9ff',
    delay: 0,
  },
  {
    icon: LayersIcon,
    titleKey: 'services.threeD.title',
    descriptionKey: 'services.threeD.description',
    features: [
      'Modélisation 3D interactive',
      'Animations GSAP fluides',
      'Rendu temps réel',
      'Interactions gestuelles',
      'Optimisation performance',
      'Compatibilité multi-navigateurs'
    ],
    color: '#ff00ff',
    delay: 0.1,
  },
  {
    icon: ServerIcon,
    titleKey: 'services.backend.title',
    descriptionKey: 'services.backend.description',
    features: [
      'APIs REST/GraphQL',
      'Bases de données optimisées',
      'Authentification sécurisée',
      'Cache et performance',
      'Déploiement cloud',
      'Monitoring et logs'
    ],
    color: '#00ff88',
    delay: 0.2,
  },
  {
    icon: PaletteIcon,
    titleKey: 'services.design.title',
    descriptionKey: 'services.design.description',
    features: [
      'Design system cohérent',
      'Prototypage interactif',
      'Tests utilisateurs',
      'Responsive design',
      'Accessibilité',
      'Optimisation conversion'
    ],
    color: '#ffaa00',
    delay: 0.3,
  },
];

export const Services = () => {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Helper function to get services data based on language
  const getServicesData = () => {
    if (language === 'en') {
      return [
        {
          icon: Code2Icon,
          titleKey: 'services.saas.title',
          descriptionKey: 'services.saas.description',
          features: [
            'Microservices architecture',
            'User and role management',
            'Automated billing system',
            'Analytics and dashboards',
            'Robust REST/GraphQL APIs',
            'Third-party integrations'
          ],
          color: '#00d9ff',
          delay: 0,
        },
        {
          icon: LayersIcon,
          titleKey: 'services.threeD.title',
          descriptionKey: 'services.threeD.description',
          features: [
            'Interactive 3D modeling',
            'Fluid GSAP animations',
            'Real-time rendering',
            'Gesture interactions',
            'Performance optimization',
            'Multi-browser compatibility'
          ],
          color: '#ff00ff',
          delay: 0.1,
        },
        {
          icon: ServerIcon,
          titleKey: 'services.backend.title',
          descriptionKey: 'services.backend.description',
          features: [
            'REST/GraphQL APIs',
            'Optimized databases',
            'Secure authentication',
            'Cache and performance',
            'Cloud deployment',
            'Monitoring and logs'
          ],
          color: '#00ff88',
          delay: 0.2,
        },
        {
          icon: PaletteIcon,
          titleKey: 'services.design.title',
          descriptionKey: 'services.design.description',
          features: [
            'Consistent design system',
            'Interactive prototyping',
            'User testing',
            'Responsive design',
            'Accessibility',
            'Conversion optimization'
          ],
          color: '#ffaa00',
          delay: 0.3,
        },
      ];
    } else {
      return services; // Use the French data
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.from(sectionRef.current?.querySelector('.section-title'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Animation des services
      const serviceItems = servicesRef.current?.children;
      if (serviceItems) {
        Array.from(serviceItems).forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            rotationX: 30,
            scale: 0.9,
            duration: 1,
            delay: index * 0.2,
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
      id="services"
      className="py-48 lg:py-64 bg-transparent relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '20%', right: '10%' }}
        />
      </div>

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <motion.h2
            className="section-title text-6xl md:text-7xl lg:text-8xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary"
            style={{
              textShadow: '0 0 80px rgba(0, 217, 255, 0.3), 0 0 120px rgba(255, 0, 255, 0.2)',
            }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.div
            className="w-32 h-2 bg-gradient-1 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              boxShadow: [
                '0 0 20px rgba(0, 217, 255, 0.5)',
                '0 0 40px rgba(255, 0, 255, 0.5)',
                '0 0 20px rgba(0, 217, 255, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div ref={servicesRef} className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {getServicesData().map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 transform-gpu h-full"
                style={{
                  boxShadow: `0 20px 60px ${service.color}20`,
                }}
              >
                {/* Background glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                  style={{ backgroundColor: `${service.color}20` }}
                />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${service.color}20` }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <service.icon
                      size={32}
                      strokeWidth={1.5}
                      style={{ color: service.color }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 pt-4">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: service.color }}
                        />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover effect line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{ backgroundColor: service.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-muted-foreground mb-8">
            {t('services.cta')}
          </p>
          <motion.div
            className="inline-flex items-center gap-2 text-primary font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <GlobeIcon size={20} strokeWidth={1.5} />
            <span>{t('services.contact')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
