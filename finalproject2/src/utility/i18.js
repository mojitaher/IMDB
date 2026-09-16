import i18n, { dir } from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      movieCenter: "MovieCenter",
      listOfMovie_message:
        "List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉",
      search: "Search Movies or TV Shows",
      all: "All",
      movie: "movie",
      type: "type",
      ReleaseDate: "Release Date",
      Runtime: "Run time",
      Genres: "Genres",
    },
  },

  fas: {
    dir: () => "rtl",
    translation: {
      movieCenter: "مرکز فیلم ها",
      listOfMovie_message:
        "😉.لیست فیلم ها و برنامه های تلویزیونی، من، پرامود پودل تا به امروز تماشا کرده ام. آنچه را که تماشا کرده‌ام کاوش کنید و همچنین با خیال راحت پیشنهادی بدهید",
      search: "جستجوی فیلم ها یا نمایش های تلویزیونی",
      all: "همه",
      movie: "فیلم",
      type: "نوع",
      ReleaseDate: "تاریخ انتشار",
      Runtime: "زمان فیلم",
      Genres: "ژانرها",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "fas",
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
