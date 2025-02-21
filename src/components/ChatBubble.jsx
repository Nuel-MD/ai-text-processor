import React, { useState } from 'react';
import { summarizeText, translateText } from '../api/aiApi';
import './ChatBubble.css';

const ChatBubble = ({ message, messages, setMessages }) => {
  const { id, text, detectedLang, translations } = message;
  const [selectedLang, setSelectedLang] = useState('es');
  const isEnglish = detectedLang === 'en';
  const showSummarize = isEnglish && text.length > 150;

  const handleSummarize = async () => {
    try {
      const summary = await summarizeText(text);
      updateMessage({ summary });
    } catch (error) {
      console.log('Summarization failed:', error.message);
      // Add error state handling
    }
  };

  // In your handleTranslate function
const handleTranslate = async () => {
  try {
    // Get detected language from message (should already be set by language detection)
    const translation = await translateText(text, detectedLang, selectedLang);
    
    updateMessage({
      translations: {
        ...translations,
        [selectedLang]: translation,
      },
    });
  } catch (error) {
    console.log('Translation failed:', error.message);
  }
};

  const updateMessage = (updates) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <div className='bubble-container' style={{ marginBottom: '1rem' }}>
      <div className="bubble">
        {text}
        {detectedLang && (
        <p className="detected-lang">Language detected: {detectedLang}</p>
      )}
      </div>
      <div className="bubble-footer">


      {/* Show Summarize if > 150 chars and in English */}
      {showSummarize && (
        <button className='summarize'  onClick={handleSummarize}>
          Summarize
        </button>
      )}

      {/* Translate Section */}
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
      >
        <option value="en">English</option>
        <option value="pt">Portuguese</option>
        <option value="es">Spanish</option>
        <option value="ru">Russian</option>
        <option value="tr">Turkish</option>
        <option value="fr">French</option>
      </select>
      <button className='Trans' onClick={handleTranslate}>
        Translate
      </button>
      </div>


      {/* Display summary if available */}
      {message.summary && (
        <div className="summary-bubble">
          <strong>Summary:</strong> {message.summary}
        </div>
      )}

      {/* Display translation if available */}
      {translations &&
        Object.entries(translations).map(([lang, trans]) => (
          <div key={lang} className="translation-bubble">
            <strong> Hi 😊💕 This is your translation in {lang.toUpperCase()}:</strong> {trans}
          </div>
        ))}
    </div>
  );
};

export default ChatBubble;
