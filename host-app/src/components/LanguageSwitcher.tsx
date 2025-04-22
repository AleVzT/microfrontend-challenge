import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button className="language__switcher" onClick={toggleLanguage}>
      {i18n.language.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;
