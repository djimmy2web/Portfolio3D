import { useLanguageStore } from '@/stores/languageStore';
import { translations } from '@/lib/translations';
import { useMemo } from 'react';

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);
  
  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key "${key}" not found for language "${language}"`);
          return key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    };
  }, [language]);
  
  return { t, language };
};
