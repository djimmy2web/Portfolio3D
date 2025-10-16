import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRightIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Fighty',
    tagline: 'SaaS de gestion pour club de combat',
    image: '/project/Fighty/Macbook-Air-fighty.fr.png',
    category: 'SaaS & Mobile App',
  },
  {
    id: 2,
    title: 'Creative Agency Site',
    tagline: 'Bold brand storytelling',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_4.png',
    category: 'Design & Development',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    tagline: 'Data visualization reimagined',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_5.png',
    category: 'UI/UX Design',
  },
  {
    id: 4,
    title: 'Portfolio Showcase',
    tagline: 'Immersive 3D experience',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_6.png',
    category: 'Interactive Design',
  },
  {
    id: 5,
    title: 'Mobile App Landing',
    tagline: 'Conversion-focused design',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_3.png',
    category: 'Marketing',
  },
  {
    id: 6,
    title: 'Tech Startup Brand',
    tagline: 'Future-forward identity',
    image: 'https://c.animaapp.com/mgmu3r4oXdQrJc/img/ai_4.png',
    category: 'Branding',
  },
];

export const PortfolioGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (projectId: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/project/${projectId}`);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-32 lg:py-48 bg-background"
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-gradient-1 mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing creativity, technical expertise, and attention to detail
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-3 text-foreground">
                    <span className="text-lg font-medium">View Project</span>
                    <ArrowRightIcon size={24} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-3">
                <div className="text-sm text-primary font-medium">{project.category}</div>
                <h3 className="text-2xl font-headline font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.tagline}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
