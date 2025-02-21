// src/api/aiApi.js
export async function detectLanguage(text) {
  return new Promise((resolve, reject) => {
    if (!window.LanguageDetector) return reject('API not loaded');
    window.LanguageDetector.detect(text, (result) => {
      resolve({ language: result.language });
    });
  });
}

export async function summarizeText(text) {
  return new Promise((resolve, reject) => {
    if (!window.TextSummarizer) return reject('API not loaded');
    window.TextSummarizer.summarize(text, (summary) => {
      resolve(summary);
    });
  });
}

export async function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    if (!window.Translator) return reject('API not loaded');
    window.Translator.translate(text, targetLang, (translation) => {
      resolve(translation);
    });
  });
}
