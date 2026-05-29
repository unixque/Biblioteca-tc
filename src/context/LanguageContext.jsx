import { createContext, useContext, useState, useEffect } from 'react'
import pt from '../locales/pt'
import en from '../locales/en'
import de from '../locales/de'
import fr from '../locales/fr'
import es from '../locales/es'
import nl from '../locales/nl'
import { translateWithFallback } from '../lib/i18n'

const dicts = { pt, en, de, fr, es, nl }

const dbCategoriesTranslation = {
  'Tecnologia & Informática': {
    en: 'Technology & IT',
    es: 'Tecnología e Informática',
    fr: 'Technologie et Informatique',
    de: 'Technologie & IT',
    nl: 'Technologie & IT'
  },
  'Ciências Sociais': {
    en: 'Social Sciences',
    es: 'Ciencias Sociales',
    fr: 'Sciences Sociales',
    de: 'Sozialwissenschaften',
    nl: 'Sociale Wetenschappen'
  },
  'Línguas': {
    en: 'Languages',
    es: 'Idiomas',
    fr: 'Langues',
    de: 'Sprachen',
    nl: 'Talen'
  },
  'Humanidades': {
    en: 'Humanities',
    es: 'Humanidades',
    fr: 'Sciences Humaines',
    de: 'Geisteswissenschaften',
    nl: 'Geesteswetenschappen'
  },
  'Estatística': {
    en: 'Statistics',
    es: 'Estadística',
    fr: 'Statistiques',
    de: 'Statistik',
    nl: 'Statistiek'
  },
  'Educação': {
    en: 'Education',
    es: 'Educación',
    fr: 'Éducation',
    de: 'Bildung',
    nl: 'Onderwijs'
  },
  'Outros': {
    en: 'Others',
    es: 'Otros',
    fr: 'Autres',
    de: 'Andere',
    nl: 'Overige'
  }
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt' // Portuguese default
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    const text = translateWithFallback(dicts, language, key)
    if (text !== undefined) return text
    console.warn(`Translation missing for key: ${key} (lang: ${language})`)
    return key
  }

  const translateCategory = (catName) => {
    if (!catName) return ''
    if (language === 'pt') return catName
    if (dbCategoriesTranslation[catName] && dbCategoriesTranslation[catName][language]) {
      return dbCategoriesTranslation[catName][language]
    }
    return catName
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateCategory }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
