// KitabVerse - Tulu Voice Typing - PRO Integration
// Branch: feature-tulu-voice-typing
// Does NOT touch Header/Footer - Only adds mic to Search

(function() {
  function initVoice() {
    const searchInput = document.querySelector('input[type="search"], input[type="text"], #search, .search-input, input[placeholder*="Search" i]');
    if (!searchInput) return;

    const micBtn = document.createElement('button');
    micBtn.innerHTML = '🎤';
    micBtn.id = 'tuluMicBtn';
    micBtn.title = 'Tulu Voice - Click to Speak';
    micBtn.style.cssText = `
      background: #C1272D;
      color: white;
      border: none;
      border-radius: 50%;
      width: 42px;
      height: 42px;
      cursor: pointer;
      margin-left: 8px;
      font-size: 18px;
      flex-shrink: 0;
    `;

    if (searchInput.parentNode) {
      searchInput.parentNode.style.display = 'flex';
      searchInput.parentNode.style.alignItems = 'center';
      searchInput.insertAdjacentElement('afterend', micBtn);
    }

    micBtn.addEventListener('click', () => {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        alert('Voice not supported in this browser. Please use Chrome.');
        return;
      }
      const rec = new SpeechRec();
      rec.lang = 'en-IN';
      rec.interimResults = false;

      rec.onstart = () => {
        micBtn.innerHTML = '🔴';
        micBtn.style.background = 'red';
        searchInput.placeholder = 'Listening Tulu...';
      };
      rec.onend = () => {
        micBtn.innerHTML = '🎤';
        micBtn.style.background = '#C1272D';
        searchInput.placeholder = 'Search...';
      };
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        searchInput.value = searchInput.value ? searchInput.value + ' ' + text : text;
        searchInput.dispatchEvent(new Event('input', {bubbles: true}));
        searchInput.focus();
      };
      rec.onerror = () => {
        micBtn.innerHTML = '🎤';
        micBtn.style.background = '#C1272D';
      };
      rec.start();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoice);
  } else {
    initVoice();
  }
})();
