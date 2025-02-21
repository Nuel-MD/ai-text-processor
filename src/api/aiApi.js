// src/api/aiApi.js
export async function detectLanguage(text) {
  return new Promise(async (resolve, reject) => {
    try {
      // Check API availability
      if (!self.ai?.languageDetector) {
        throw new Error('Language Detector API not loaded');
      }

      // Create detector instance
      const detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      resolve({ language: results[0].detectedLanguage });
    } catch (error) {
      reject(error);
    }
  });
}

export async function summarizeText(text) {
  try {
    // 1. Check API support
    if (!self.ai?.summarizer) {
      throw new Error('Summarizer API not loaded');
    }

    // 2. Check capabilities
    const capabilities = await self.ai.summarizer.capabilities();
    
    if (capabilities.available === 'no') {
      throw new Error('Summarization not available');
    }

    // 3. Create summarizer with options
    const summarizer = await self.ai.summarizer.create({
      type: 'key-points', // or 'tl;dr', 'teaser', 'headline'
      format: 'plain-text', // or 'markdown'
      length: 'medium',
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Download progress: ${(e.loaded / e.total * 100).toFixed(1)}%`);
        });
      }
    });

    // 4. Wait for readiness if needed
    if (capabilities.available === 'after-download') {
      await summarizer.ready;
    }

    // 5. Perform summarization
    const summary = await summarizer.summarize(text, {
      context: 'General text summary' // Add context if needed
    });

    return summary;

  } catch (error) {
    console.error('Summarization failed:', error);
    throw error;
  }
}

export async function translateText(text, sourceLang, targetLang) {
  try {
    // 1. Check API support
    if (!self.ai?.translator) {
      throw new Error('Translator API not loaded');
    }

    // 2. Check language pair availability
    const capabilities = await self.ai.translator.capabilities();
    const pairStatus = capabilities.languagePairAvailable(sourceLang, targetLang);
    
    if (pairStatus === 'no') {
      throw new Error('Language pair not supported');
    }

    // 3. Create translator with progress monitoring
    const translator = await self.ai.translator.create({
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Download progress: ${(e.loaded / e.total * 100).toFixed(1)}%`);
        });
      }
    });

    // 4. Wait for translator readiness
    await translator.ready;

    // 5. Perform translation
    const translation = await translator.translate(text);
    return translation;

  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}