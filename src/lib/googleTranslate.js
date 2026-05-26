/**
 * Browser-safe client-side Google Translate API client.
 * Mimics the exact API and response structure of the 'google-translate-api' package,
 * but operates using a CORS-free Google Translate web endpoint (client=gtx)
 * suitable for front-end Vite environments without leaking API keys or requiring proxies.
 *
 * Reference: https://github.com/vitalets/google-translate-api
 */

export async function translate(text, options = {}) {
  if (!text) return { text: '', from: { language: { iso: 'auto' } } };
  
  const to = options.to || 'en';
  const from = options.from || 'auto';
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Google Translate API returned status ${res.status}`);
    }
    
    const data = await res.json();
    
    // Parse the translated sentences from the Google Translate array format
    if (!data || !data[0]) {
      throw new Error('Invalid response format from Google Translate');
    }
    
    const translatedText = data[0]
      .filter(item => item && item[0])
      .map(item => item[0])
      .join('');
      
    const detectedLang = data[2] || from;
    
    return {
      text: translatedText,
      from: {
        language: {
          didYouMean: false,
          iso: detectedLang
        },
        text: {
          autoCorrected: false,
          value: '',
          didYouMean: false
        }
      }
    };
  } catch (error) {
    console.error('[GoogleTranslate] Translation failed:', error);
    throw error;
  }
}

export default translate;
