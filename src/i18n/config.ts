import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';
import jaTranslation from './locales/ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
    },
    fallbackLng: (() => {
      // 获取用户时区
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // 根据时区判断默认语言
      if (userTimeZone.includes('Asia/Shanghai') || 
          userTimeZone.includes('Asia/Hong_Kong') || 
          userTimeZone.includes('Asia/Macau') || 
          userTimeZone.includes('Asia/Taipei')) {
        return 'zh';
      } else if (userTimeZone.includes('Asia/Tokyo') || 
                userTimeZone.includes('Asia/Osaka') || 
                userTimeZone.includes('Japan')) {
        return 'ja';
      } else {
        return 'en';
      }
    })(),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 