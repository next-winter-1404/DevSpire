import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from './fa/fa.json'
import en from './en/en.json'


const resources = {
  fa:{
    translation: fa
  },
  en:{
    translation: en
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "fa", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;