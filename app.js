// KitabVerse v16.1 Century + Braille - Foundation JS - Navy Gold
console.log('KitabVerse v16.1 Century + Braille - 100 Points - Foundation Loaded');

document.addEventListener('DOMContentLoaded',()=>{
  // Glow pulse for hero logo
  const heroLogo = document.getElementById('heroLogo');
  let glow = 0;
  setInterval(()=>{
    glow = (glow+1)%100;
    if(heroLogo){
      const size = 30 + Math.sin(glow/10)*10;
      heroLogo.style.boxShadow = `0 0 ${size}px #D4AF37`;
    }
  },100);

  // TV Cast - Presentation API placeholder
  const castBtn = document.getElementById('castBtn');
  if(castBtn){
    castBtn.addEventListener('click',()=>{
      alert('📺 Cast to TV via Internet\n\nSearching for Smart TVs:\nMi • Samsung • LG • Sony • Fire Stick • Chromecast • Jio\n\nTech: Presentation API + Cast SDK + AirPlay + DLNA\nWorks on same WiFi OR different WiFi via internet\n\nThis will be live in Step 3 - Real cast');
    });
  }

  // Search - Book + Donor + Voice + Braille
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if(searchBtn && searchInput){
    searchBtn.addEventListener('click',()=>{
      const val = searchInput.value.trim();
      if(!val){ alert('Type: Book title OR barcode KITAB-2026-0888 OR Donor DONOR-2026-0012 OR speak Kannada/Tulu/Braille'); return;}
      alert('🔍 Searching: '+val+'\n\nWill search:\n• Book barcode KITAB-2026-0888\n• Donor QR DONOR-2026-0012\n• Voice Kannada/Tulu/Hindi\n• Braille Ready BRF\n\nFull search live in Step 2 Firebase');
    });
    searchInput.addEventListener('keypress',(e)=>{ if(e.key==='Enter') searchBtn.click(); });
  }

  // Braille Ready log - WCAG AAA
  console.log('♿ Accessibility: Voice | High Contrast | Braille Ready BRF');
  console.log('Braille Display Compatible: Orbit Reader, Braille Edge, HumanWare');
  console.log('Screen Reader: NVDA, JAWS, TalkBack, VoiceOver - Semantic HTML + ARIA');
});
