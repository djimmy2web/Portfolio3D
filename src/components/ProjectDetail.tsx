import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, XIcon, ZoomInIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectData: Record<string, any> = {
  '1': {
    title: 'Fighty',
    category: 'SaaS & Mobile App',
    role: 'Développeur Full-Stack ',
    tools: 'Next.js(React), MongoDB, React Native, Stripe, IA',
    description:
      'Fighty est un SaaS complet pour la gestion de clubs de combat. La plateforme inclut la gestion des cours, des notes, un smart bio des documents, une IA pour l\'équipe, la gestion des adhérents, des groupes, des conversations, des adhésions, des formulaires, des produits, de la comptabilité, des factures, et bien plus encore. L\'application mobile complète l\'expérience utilisateur.',
    descriptionEn:
      'Fighty is a comprehensive SaaS for combat club management. The platform includes course management, notes, smart bio for documents, AI for the team, member and group management, conversations, memberships, forms, products, accounting, billing, and much more. The mobile application completes the user experience.',
    results: 'Solution complète de gestion pour clubs de combat avec IA intégrée',
    resultsEn: 'Complete combat club management solution with integrated AI',
    banner: '/project/Fighty/principalefighty.png',
    colors: {
      primary: '#ff4444',
      secondary: '#ff6666',
      accent: '#ff8888',
      background: '#1a0a0a',
      text: '#ffffff',
      gradient: 'from-red-500 to-red-700'
    },
    features: [
      'Gestion des cours et planning',
      'Système de notes et évaluations',
      'Smart bio pour présenter son clubs',
      'Gestion des adhérents et groupes',
      'Système de conversations et chat',
      'Gestion des adhésions et paiements',
      'Formulaires personnalisables',
      'Catalogue de produits',
      'Comptabilité et facturation',
      'Application mobile native',
      'Tableau de bord analytique',
      'Système de notifications'
    ],
    featuresEn: [
      'Course and schedule management',
      'Notes and evaluation system',
      'Smart bio to present your club',
      'Member and group management',
      'Conversation and chat system',
      'Membership and payment management',
      'Customizable forms',
      'Product catalog',
      'Accounting and billing',
      'Native mobile application',
      'Analytics dashboard',
      'Notification system'
    ],
    media: [
      { type: 'image', url: '/project/Fighty/Macbook-Air-fighty.fr.png' },
      { type: 'image', url: '/project/Fighty/Documents1.png' },
      { type: 'image', url: '/project/Fighty/Comptabilité%20-%20Dashboard.png' },
      { type: 'image', url: '/project/Fighty/Tâches%20-%20Tableau.png' },
      { type: 'image', url: '/project/Fighty/Mobile/chat.png' },
      { type: 'image', url: '/project/Fighty/Mobile/cours.png' },
      { type: 'image', url: '/project/Fighty/Mobile/documents.png' },
      { type: 'image', url: '/project/Fighty/Mobile/inscription.png' },
    ],
  },
  '2': {
    title: 'Red Bull Landing 3D',
    category: '3D & Animation',
    role: 'Développeur 3D & Frontend',
    tools: 'React, Three.js, GSAP, WebGL, Blender',
    description:
      'Landing page immersive pour Red Bull avec expérience 3D interactive. Intégration d\'éléments 3D, animations fluides et design énergique qui capture l\'essence de la marque Red Bull.',
    descriptionEn:
      'Immersive Red Bull landing page with interactive 3D experience. Integration of 3D elements, fluid animations and energetic design that captures the essence of the Red Bull brand.',
    results: 'Expérience utilisateur immersive avec animations 3D fluides',
    resultsEn: 'Immersive user experience with fluid 3D animations',
    banner: '/project/Redbull/1.JPG',
    video: '/project/Redbull/Macbook-Air-redbull-3d.vercel.app-l-vf7204kg4g8_.webm',
    colors: {
      primary: '#ff0000',
      secondary: '#ff3333',
      accent: '#ff6666',
      background: '#0a0a0a',
      text: '#ffffff',
      gradient: 'from-red-500 to-red-700'
    },
    features: [
      'Expérience 3D immersive',
      'Animations fluides avec GSAP',
      'Intégration Three.js',
      'Design énergique',
      'Responsive design',
      'Optimisation performance',
      'Interactions utilisateur avancées',
      'Effets visuels dynamiques'
    ],
    featuresEn: [
      'Immersive 3D experience',
      'Fluid animations with GSAP',
      'Three.js integration',
      'Energetic design',
      'Responsive design',
      'Performance optimization',
      'Advanced user interactions',
      'Dynamic visual effects'
    ],
    media: [
      { type: 'image', url: '/project/Redbull/1.JPG' },
      { type: 'image', url: '/project/Redbull/2.JPG' },
      { type: 'image', url: '/project/Redbull/3.JPG' },
      { type: 'image', url: '/project/Redbull/4.JPG' },
      { type: 'image', url: '/project/Redbull/5.JPG' },
    ],
  },
  '3': {
    title: 'Architect Landing',
    category: 'Landing Page',
    role: 'Développeur Frontend & Designer',
    tools: 'React, Tailwind CSS, Framer Motion, Three.js',
    description:
      'Landing page moderne pour un architecte avec design épuré, animations fluides et présentation professionnelle des projets architecturaux.',
    descriptionEn:
      'Modern landing page for an architect with clean design, fluid animations and professional presentation of architectural projects.',
    results: 'Landing page élégante avec animations fluides',
    resultsEn: 'Elegant landing page with fluid animations',
    banner: '/project/Architect/architecte.png',
    colors: {
      primary: '#D2691E',
      secondary: '#FF8C00',
      accent: '#FFA500',
      background: '#1a0f0a',
      text: '#ffffff',
      gradient: 'from-orange-500 to-orange-700'
    },
    features: [
      'Design épuré et moderne',
      'Animations fluides',
      'Présentation des projets',
      'Responsive design',
      'Optimisation SEO',
      'Performance optimisée'
    ],
    featuresEn: [
      'Clean and modern design',
      'Fluid animations',
      'Project presentation',
      'Responsive design',
      'SEO optimization',
      'Performance optimized'
    ],
    media: [
      { type: 'image', url: '/project/Architect/architecte.png' },
    ],
  },
};

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = id ? projectData[id] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.from(mediaRef.current?.children || [], {
        x: (index) => (index % 2 === 0 ? -100 : 100),
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: mediaRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-headline font-bold text-foreground">Project Not Found</h1>
          <Button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
          >
            <ArrowLeftIcon size={20} strokeWidth={1.5} className="mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-8 lg:px-16 py-16">
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => navigate('/'), 300);
          }}
          variant="outline"
          className="mb-12 bg-transparent text-foreground border-border hover:bg-muted hover:text-primary font-normal"
        >
          <ArrowLeftIcon size={20} strokeWidth={1.5} className="mr-2" />
          Back to Portfolio
        </Button>

        <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-16">
          {project.video ? (
            <video
              src={project.video}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={project.banner}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <div 
              className="font-medium text-lg"
              style={{ color: project.colors?.primary }}
            >
              {project.category}
            </div>
            <h1 
              className="text-5xl md:text-6xl font-headline font-bold"
              style={{ 
                color: project.colors?.primary,
                textShadow: `0 0 30px ${project.colors?.primary}30`
              }}
            >
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 py-8 border-y border-border">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Role</div>
              <div className="text-foreground font-medium">{project.role}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Tools</div>
              <div className="text-foreground font-medium">{project.tools}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Results</div>
              <div className="text-foreground font-medium">
                {language === 'en' && project.resultsEn ? project.resultsEn : project.results}
              </div>
            </div>
          </div>

          {project.features && (
            <div className="py-8">
              <h3 className="text-2xl font-headline font-bold text-foreground mb-6">
                {language === 'en' ? 'Main Features' : 'Fonctionnalités principales'}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(language === 'en' && project.featuresEn ? project.featuresEn : project.features).map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-card border rounded-lg transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: `${project.colors?.primary}30`,
                      boxShadow: `0 2px 10px ${project.colors?.primary}10`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${project.colors?.primary}60`;
                      e.currentTarget.style.boxShadow = `0 4px 20px ${project.colors?.primary}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${project.colors?.primary}30`;
                      e.currentTarget.style.boxShadow = `0 2px 10px ${project.colors?.primary}10`;
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.colors?.primary }}
                    />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.title === 'Fighty' && (
            <div className="py-8 border-t border-border">
              <div 
                className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 rounded-lg border-2"
                style={{
                  background: `linear-gradient(135deg, ${project.colors?.primary}20, ${project.colors?.secondary}10)`,
                  borderColor: `${project.colors?.primary}40`,
                  boxShadow: `0 0 30px ${project.colors?.primary}20`
                }}
              >
                <div className="text-center md:text-left">
                  <h3 
                    className="text-2xl font-headline font-bold mb-2"
                    style={{ color: project.colors?.primary }}
                  >
                    {language === 'en' ? 'Try Fighty' : 'Testez Fighty'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'Discover the combat club management platform' 
                      : 'Découvrez la plateforme de gestion pour clubs de combat'
                    }
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => window.open('https://fighty.fr', '_blank')}
                    className="font-medium px-8 py-3 text-white border-0"
                    style={{
                      backgroundColor: project.colors?.primary,
                      boxShadow: `0 4px 15px ${project.colors?.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.primary;
                    }}
                  >
                    {language === 'en' ? 'Access the app' : 'Accéder à l\'app'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://fighty.fr', '_blank')}
                    className="font-medium px-8 py-3"
                    style={{
                      borderColor: project.colors?.primary,
                      color: project.colors?.primary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${project.colors?.primary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {language === 'en' ? 'View website' : 'Voir le site'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {project.title === 'Red Bull Landing 3D' && (
            <div className="py-8 border-t border-border">
              <div 
                className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 rounded-lg border-2"
                style={{
                  background: `linear-gradient(135deg, ${project.colors?.primary}20, ${project.colors?.secondary}10)`,
                  borderColor: `${project.colors?.primary}40`,
                  boxShadow: `0 0 30px ${project.colors?.primary}20`
                }}
              >
                <div className="text-center md:text-left">
                  <h3 
                    className="text-2xl font-headline font-bold mb-2"
                    style={{ color: project.colors?.primary }}
                  >
                    {language === 'en' ? 'Experience Red Bull 3D' : 'Découvrez Red Bull 3D'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'Explore the immersive 3D landing page' 
                      : 'Explorez la landing page immersive en 3D'
                    }
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => window.open('https://redbull-3d.vercel.app/', '_blank')}
                    className="font-medium px-8 py-3 text-white border-0"
                    style={{
                      backgroundColor: project.colors?.primary,
                      boxShadow: `0 4px 15px ${project.colors?.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.primary;
                    }}
                  >
                    {language === 'en' ? 'Visit the site' : 'Visiter le site'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://redbull-3d.vercel.app/', '_blank')}
                    className="font-medium px-8 py-3"
                    style={{
                      borderColor: project.colors?.primary,
                      color: project.colors?.primary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${project.colors?.primary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {language === 'en' ? 'View project' : 'Voir le projet'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {project.title === 'Architect Landing' && (
            <div className="py-8 border-t border-border">
              <div 
                className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 rounded-lg border-2"
                style={{
                  background: `linear-gradient(135deg, ${project.colors?.primary}20, ${project.colors?.secondary}10)`,
                  borderColor: `${project.colors?.primary}40`,
                  boxShadow: `0 0 30px ${project.colors?.primary}20`
                }}
              >
                <div className="text-center md:text-left">
                  <h3 
                    className="text-2xl font-headline font-bold mb-2"
                    style={{ color: project.colors?.primary }}
                  >
                    {language === 'en' ? 'Explore Architect Portfolio' : 'Découvrez le Portfolio Architecte'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'Visit the modern architect landing page' 
                      : 'Visitez la landing page architecte moderne'
                    }
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => window.open('https://architecte-7sk4.vercel.app/', '_blank')}
                    className="font-medium px-8 py-3 text-white border-0"
                    style={{
                      backgroundColor: project.colors?.primary,
                      boxShadow: `0 4px 15px ${project.colors?.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = project.colors?.primary;
                    }}
                  >
                    {language === 'en' ? 'Visit the site' : 'Visiter le site'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://architecte-7sk4.vercel.app/', '_blank')}
                    className="font-medium px-8 py-3"
                    style={{
                      borderColor: project.colors?.primary,
                      color: project.colors?.primary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${project.colors?.primary}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {language === 'en' ? 'View portfolio' : 'Voir le portfolio'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div ref={mediaRef} className="space-y-12 pt-8">
            {project.media.map((item: any, index: number) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-border group cursor-pointer"
                onClick={() => setSelectedImage(item.url)}
              >
                <img
                  src={item.url}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomInIcon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de zoom */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Image zoomée"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0"
              size="icon"
            >
              <XIcon size={20} />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
