// KitabVerse - Tulu Voice Typing Feature
// Branch: feature-tulu-voice-typing
// Header & Footer Locked - No Change

import { useState } from 'react';

export default function VoiceTyping({ onResult }) {
  const [listening, setListening] = useState(false);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Voice not supported. Please use Chrome.');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      if (onResult) onResult(text);
    };
    rec.start();
  };

  return (
    <button
      onClick={startVoice}
      style={{
        background: listening ? '#ff0000' : '#C1272D',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        fontSize: '20px',
        cursor: 'pointer'
      }}
    >
      {listening ? '●' : '🎤'}
    </button>
  );
}
