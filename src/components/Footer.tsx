import { useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: GithubIcon, label: 'GitHub', url: 'https://github.com' },
  { icon: LinkedinIcon, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: TwitterIcon, label: 'Twitter', url: 'https://twitter.com' },
];

export const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-2 border-t border-border">
      <div className="container mx-auto px-8 lg:px-16 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-headline font-bold text-foreground mb-2">Djimmy Allard</div>
            <p className="text-muted-foreground">{t('hero.subtitle')}</p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Djimmy Allard. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};
