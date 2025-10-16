import { useEffect, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useNavigationStore } from '@/stores/navigationStore';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

const navItems = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'portfolio', labelKey: 'nav.portfolio' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export const Navbar = () => {
  const { activeSection, setActiveSection, isMobileMenuOpen, setMobileMenuOpen } =
    useNavigationStore();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-headline font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            DA
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`px-6 py-3 text-base font-normal transition-all cursor-pointer relative group ${
                          activeSection === item.id
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {t(item.labelKey)}
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                            activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <LanguageSelector />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden bg-transparent text-foreground hover:bg-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XIcon size={32} strokeWidth={1.5} /> : <MenuIcon size={32} strokeWidth={1.5} />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex flex-col w-full">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id} className="w-full">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-8 py-5 text-base font-normal transition-colors cursor-pointer ${
                          activeSection === item.id
                            ? 'text-primary bg-muted'
                            : 'text-foreground hover:text-primary hover:bg-muted'
                        }`}
                      >
                        {t(item.labelKey)}
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <div className="px-8 py-4 border-t border-border flex flex-col gap-4">
                  <LanguageSelector />
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </nav>
    </header>
  );
};
