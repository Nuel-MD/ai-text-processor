import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // for styling

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/chat');
  };

  return (
    <div className="landing-container">
        <div className="logo">Green.Ai <span>🍃</span></div>

      <div className="card">
        <h1>Hi visitor! Explore your friendly all-in-one Ai App...</h1>
        <p>Language detection, Translation, and free text Summarization...</p>
        <button className='btn' onClick={handleStart}>Start Now</button>
      </div>
    </div>
  );
};

export default LandingPage;
