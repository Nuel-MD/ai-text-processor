import React, { useState, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import { detectLanguage } from '../api/aiApi'; // We'll create these
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [apisReady, setApisReady] = useState(false);

  useEffect(() => {
    const checkAPIs = () => {
      if (window.LanguageDetector && 
          window.TextSummarizer && 
          window.Translator) {
        setApisReady(true);
      } else {
        setTimeout(checkAPIs, 100);
      }
    };
    checkAPIs();
  }, []);
  useEffect(() => {
    const stored = localStorage.getItem('chatMessages');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      text,
      translations: {},
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newMessage]);

    // Detect language for the newly added message
    try {
      const detectedLang = await detectLanguage(text);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, detectedLang: detectedLang.language }
            : msg
        )
      );
    } catch (error) {
      // handle error
      console.error(error);
      alert('Language detection failed. Please try again later.');
    }
  };

  return (
    <div className="chat-container">
      <div className="logo">Green.Ai <span>🍃</span></div>
      <div className="chat-window">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            messages={messages}
            setMessages={setMessages}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
