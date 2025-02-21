import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <div className="chat-area">
      <textarea
        placeholder="Type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Type text to summarize or translate"
      />
      <button className='material-symbols-outlined btn1' type="submit" aria-label="Send text">
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#75FB4C"><path d="M120-160v-640l760 320-760 320Zm66.67-102 520.66-218-520.66-220v158.67L428-480l-241.33 60v158Zm0 0v-438 438Z"/></svg>
      </button>
      </div>

    </form>
  );
};

export default ChatInput;
