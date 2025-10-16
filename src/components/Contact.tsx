import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon, MapPinIcon, PhoneIcon, CheckCircle2Icon } from 'lucide-react';
import { useContactStore } from '@/stores/contactStore';
import { useTranslation } from '@/hooks/useTranslation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MailIcon, labelKey: 'contact.contactInfo.email', value: 'djimmy.allard@hotmail.fr' },
  { icon: PhoneIcon, labelKey: 'contact.contactInfo.phone', value: '06 18 35 70 88' },
  { icon: MapPinIcon, labelKey: 'contact.contactInfo.location', value: 'Tours, France' },
];

export const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { formData, isSubmitting, isSubmitted, updateFormData, submitForm } = useContactStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await submitForm();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 lg:py-48 bg-background"
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-1 mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <item.icon size={24} strokeWidth={1.5} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">{t(item.labelKey)}</div>
                    <div className="text-lg text-foreground font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="relative">
                  <CheckCircle2Icon size={80} strokeWidth={1.5} className="text-success" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-headline font-semibold text-foreground">{t('contact.successTitle')}</h3>
                  <p className="text-muted-foreground">{t('contact.successDescription')}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    className="bg-card border-border text-foreground focus:border-primary"
                    placeholder={t('contact.placeholders.name')}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="bg-card border-border text-foreground focus:border-primary"
                    placeholder={t('contact.placeholders.email')}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    className="bg-card border-border text-foreground focus:border-primary min-h-[200px]"
                    placeholder={t('contact.placeholders.message')}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
