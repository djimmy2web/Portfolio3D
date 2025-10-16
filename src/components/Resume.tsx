import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

// Les données d'expérience et d'éducation sont maintenant dans les traductions

export const Resume = () => {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Helper functions to get experience and education data
  const getExperienceData = () => {
    if (language === 'fr') {
      return [
        {
          year: '2022 - Présent',
          title: 'Développeur Frontend Senior',
          company: 'Tech Innovations Inc.',
          description: 'Direction du développement d\'applications web de pointe avec un focus sur les performances et l\'expérience utilisateur.',
        },
        {
          year: '2020 - 2022',
          title: 'Développeur Full Stack',
          company: 'Digital Solutions Co.',
          description: 'Développement d\'applications web évolutives et mise en place de systèmes de design modernes.',
        },
        {
          year: '2018 - 2020',
          title: 'Développeur Junior',
          company: 'Agence Créative',
          description: 'Développement de sites web responsifs et d\'expériences interactives pour des clients diversifiés.',
        },
      ];
    } else {
      return [
        {
          year: '2022 - Present',
          title: 'Senior Frontend Developer',
          company: 'Tech Innovations Inc.',
          description: 'Leading development of cutting-edge web applications with focus on performance and user experience.',
        },
        {
          year: '2020 - 2022',
          title: 'Full Stack Developer',
          company: 'Digital Solutions Co.',
          description: 'Built scalable web applications and implemented modern design systems.',
        },
        {
          year: '2018 - 2020',
          title: 'Junior Developer',
          company: 'Creative Agency',
          description: 'Developed responsive websites and interactive experiences for diverse clients.',
        },
      ];
    }
  };

  const getEducationData = () => {
    if (language === 'fr') {
      return [
        {
          year: '2014 - 2018',
          title: 'Licence en Informatique',
          institution: 'Université de Technologie',
          description: 'Spécialisé en développement web et interaction homme-machine.',
        },
      ];
    } else {
      return [
        {
          year: '2014 - 2018',
          title: 'Bachelor of Computer Science',
          institution: 'University of Technology',
          description: 'Specialized in web development and human-computer interaction.',
        },
      ];
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      
      items?.forEach((item) => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          rotationX: -15,
          transformOrigin: 'center top',
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    console.log('DownloadIcon CV clicked');
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="py-32 lg:py-48 bg-gradient-2"
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
            {t('resume.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-1 mx-auto" />
          <Button
            onClick={handleDownloadCV}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
          >
            <DownloadIcon size={20} strokeWidth={1.5} className="mr-2" />
            {t('resume.download')}
          </Button>
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto space-y-24">
          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-12">
              <BriefcaseIcon size={32} strokeWidth={1.5} className="text-primary" />
              <h3 className="text-3xl font-headline font-semibold text-foreground">{t('resume.experience.title')}</h3>
            </div>

            {getExperienceData().map((item: any, index: number) => (
              <div
                key={index}
                className="timeline-item relative pl-12 border-l-2 border-primary/30"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary border-4 border-background" />
                <div className="space-y-3">
                  <div className="text-sm text-primary font-medium">{item.year}</div>
                  <h4 className="text-2xl font-headline font-semibold text-foreground">{item.title}</h4>
                  <div className="text-lg text-muted-foreground">{item.company}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-12">
              <GraduationCapIcon size={32} strokeWidth={1.5} className="text-secondary" />
              <h3 className="text-3xl font-headline font-semibold text-foreground">{t('resume.education.title')}</h3>
            </div>

            {getEducationData().map((item: any, index: number) => (
              <div
                key={index}
                className="timeline-item relative pl-12 border-l-2 border-secondary/30"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-secondary border-4 border-background" />
                <div className="space-y-3">
                  <div className="text-sm text-secondary font-medium">{item.year}</div>
                  <h4 className="text-2xl font-headline font-semibold text-foreground">{item.title}</h4>
                  <div className="text-lg text-muted-foreground">{item.institution}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
