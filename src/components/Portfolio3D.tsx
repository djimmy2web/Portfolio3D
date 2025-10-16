import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { useTranslation } from '../hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Fighty',
    tagline: 'SaaS de gestion pour club de combat',
    image: '/project/Fighty/principalefighty.png',
    category: 'SaaS & Mobile App',
    color: '#ff4444',
  },
  {
    id: 2,
    title: 'Red Bull Landing 3D',
    tagline: 'Immersive landing page with 3D experience',
    image: '/project/Redbull/Macbook-Air-redbull-3d.vercel.app-l-vf7204kg4g8_.webm',
    category: '3D & Animation',
    color: '#ff0000',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    tagline: 'Data visualization reimagined',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_5.png',
    category: 'UI/UX Design',
    color: '#00ff88',
  },
  {
    id: 4,
    title: 'Portfolio Showcase',
    tagline: 'Immersive 3D experience',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_6.png',
    category: 'Interactive Design',
    color: '#ffaa00',
  },
  {
    id: 5,
    title: 'Mobile App Landing',
    tagline: 'Conversion-focused design',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_3.png',
    category: 'Marketing',
    color: '#ff0088',
  },
  {
    id: 6,
    title: 'Tech Startup Brand',
    tagline: 'Future-forward identity',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_4.png',
    category: 'Branding',
    color: '#8800ff',
  },
];

const ProjectCard = ({ project }: { project: any }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleProjectClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/project/${project.id}`);
    }, 300);
  };

  useEffect(() => {
    if (!cardRef.current) return;

    // Initialiser les styles pour l'animation - éléments visibles par défaut
    gsap.set(cardRef.current, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      scale: 1,
    });

    // Animation d'entrée plus douce
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
      y: 40,
      opacity: 0.3,
      rotationX: 15,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Animation de parallaxe plus subtile
    gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
      y: -10,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="perspective-2000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <Card
        className="group relative overflow-hidden bg-card border-2 border-border hover:border-primary transition-all duration-500 cursor-pointer transform-gpu"
        onClick={handleProjectClick}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {project.image.endsWith('.webm') || project.image.endsWith('.mp4') ? (
            <motion.video
              src={project.image}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.6 }}
            />
          )}

          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}60, transparent 70%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0.5,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center space-y-4">
              <motion.div
                className="text-3xl font-headline font-bold"
                style={{
                  color: project.color,
                  textShadow: isHovered
                    ? `0 0 20px ${project.color}, 0 0 40px ${project.color}`
                    : 'none',
                }}
              >
                VIEW PROJECT
              </motion.div>
              <motion.div
                className="h-1 mx-auto rounded-full"
                style={{ backgroundColor: project.color }}
                animate={{
                  width: isHovered ? 96 : 64,
                  boxShadow: isHovered ? `0 0 20px ${project.color}` : 'none',
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="p-8 space-y-4 relative">
          <motion.div
            className="absolute top-0 left-0 h-full opacity-10"
            style={{ backgroundColor: project.color }}
            animate={{
              width: isHovered ? '100%' : 8,
            }}
            transition={{ duration: 0.5 }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-sm font-medium mb-2"
              style={{ color: project.color }}
              animate={{
                textShadow: isHovered ? `0 0 10px ${project.color}` : 'none',
              }}
            >
              {project.category}
            </motion.div>
            <h3 className="text-3xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-lg">{project.tagline}</p>
          </div>
        </div>

        <motion.div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}40, transparent)`,
          }}
        />
      </Card>
    </motion.div>
  );
};

export const Portfolio3D = () => {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Helper function to get projects data based on language
  const getProjectsData = () => {
    if (language === 'fr') {
      return [
        {
          id: 1,
          title: 'Fighty',
          tagline: 'SaaS de gestion pour club de combat',
          image: '/project/Fighty/principalefighty.png',
          category: 'SaaS & Application Mobile',
          color: '#ff4444',
        },
        {
          id: 2,
          title: 'Red Bull Landing 3D',
          tagline: 'Landing page immersive avec expérience 3D',
          image: '/project/Redbull/Macbook-Air-redbull-3d.vercel.app-l-vf7204kg4g8_.webm',
          category: '3D & Animation',
          color: '#ff0000',
        },
        {
          id: 3,
          title: 'Architect Landing',
          tagline: 'Landing page pour architecte moderne',
          image: '/project/Architect/architecte.png',
          category: 'Landing Page',
          color: '#D2691E',
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: 'Fighty',
          tagline: 'Combat club management SaaS',
          image: '/project/Fighty/principalefighty.png',
          category: 'SaaS & Mobile App',
          color: '#ff4444',
        },
        {
          id: 2,
          title: 'Red Bull Landing 3D',
          tagline: 'Immersive landing page with 3D experience',
          image: '/project/Redbull/Macbook-Air-redbull-3d.vercel.app-l-vf7204kg4g8_.webm',
          category: '3D & Animation',
          color: '#ff0000',
        },
        {
          id: 3,
          title: 'Architect Landing',
          tagline: 'Modern architect landing page',
          image: '/project/Architect/architecte.png',
          category: 'Landing Page',
          color: '#D2691E',
        },
      ];
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
          markers: false, // Débogage - mettre à true pour voir les triggers
        },
        y: 120,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out',
      });

      // Animation de parallaxe du titre
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom top',
          scrub: 1.2,
          markers: false, // Débogage - mettre à true pour voir les triggers
        },
        y: -40,
      });

      // Animation de la grille de projets - plus douce
      gsap.from(sectionRef.current?.querySelector('.grid')?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
        y: 50,
        opacity: 0.2,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-48 lg:py-64 bg-transparent relative overflow-hidden"
    >

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="text-center mb-32 space-y-6">
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-9xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary animate-gradient"
            style={{
              textShadow:
                '0 0 80px rgba(0, 217, 255, 0.3), 0 0 120px rgba(255, 0, 255, 0.2)',
            }}
          >
            {t('portfolio.title')}
          </h2>
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
            {t('portfolio.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {getProjectsData().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
