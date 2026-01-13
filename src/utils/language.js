/**
 * Detects the browser language and returns a supported language code
 * @returns {string} 'en' if browser language starts with 'en', otherwise 'de'
 */
export const detectBrowserLanguage = () => {
  if (typeof window === 'undefined') {
    return 'de'; // Server-side fallback
  }
  
  // Get browser language (e.g., 'en-US', 'en', 'de-DE', 'de', 'fr-FR')
  const browserLang = navigator.language || navigator.userLanguage || 'de';
  
  // Check if browser language starts with 'en' (en, en-US, en-GB, etc.)
  if (browserLang.toLowerCase().startsWith('en')) {
    return 'en';
  }
  
  // Default to German for all other languages
  return 'de';
};

/**
 * Gets the language preference from localStorage or detects from browser
 * Also saves the detected language to localStorage if it wasn't previously saved
 * @returns {string} Language code ('de' or 'en')
 */
export const getLanguagePreference = () => {
  // First, check if user has manually selected a language
  const savedLanguage = localStorage.getItem('training-language');
  if (savedLanguage === 'de' || savedLanguage === 'en') {
    return savedLanguage;
  }
  
  // If no saved preference, detect from browser and save it
  const detectedLanguage = detectBrowserLanguage();
  localStorage.setItem('training-language', detectedLanguage);
  return detectedLanguage;
};
