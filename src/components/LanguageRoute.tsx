import { useEffect, createContext, useContext } from 'react';

interface LanguageRouteProps {
  language: 'en' | 'ar';
  children: React.ReactNode;
}

// Create a context for the current route language
const RouteLanguageContext = createContext<'en' | 'ar'>('ar');

export const useRouteLanguage = () => useContext(RouteLanguageContext);

export const LanguageRoute = ({ language, children }: LanguageRouteProps) => {
  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <RouteLanguageContext.Provider value={language}>
      {children}
    </RouteLanguageContext.Provider>
  );
};
