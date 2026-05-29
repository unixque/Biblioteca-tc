/** Resolve a dotted i18n key against a locale dictionary; returns string or undefined. */
export function getTranslationString(dictionary, key) {
  if (!dictionary || !key) return undefined
  const keys = key.split('.')
  let value = dictionary
  for (const k of keys) {
    if (value?.[k] === undefined) return undefined
    value = value[k]
  }
  return typeof value === 'string' ? value : undefined
}

/** Try current language, then English, then Portuguese. */
export function translateWithFallback(dicts, language, key) {
  const chain = language === 'pt'
    ? ['pt', 'en']
    : language === 'en'
      ? ['en', 'pt']
      : [language, 'en', 'pt']

  for (const lang of chain) {
    const text = getTranslationString(dicts[lang], key)
    if (text !== undefined) return text
  }
  return undefined
}
