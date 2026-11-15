const books = [
  { id:1, title:"The Alchemist", author:"Paulo Coelho", lang:"english", emoji:"📖", desc:"A shepherd boy's journey to find treasure teaches the wisdom of listening to heart." },
  { id:2, title:"Atomic Habits", author:"James Clear", lang:"english", emoji:"📚", desc:"Tiny changes, remarkable results. Build good habits, break bad ones." },
  { id:3, title:"Wings of Fire", author:"A.P.J. Abdul Kalam", lang:"english", emoji:"🚀", desc:"Autobiography of India's Missile Man and former President." },
  { id:4, title:"गोदान", author:"प्रेमचंद", lang:"hindi", emoji:"🌾", desc:"किसान होरी की कहानी - भारतीय ग्रामीण जीवन का सजीव चित्रण।" },
  { id:5, title:"रश्मिरथी", author:"रामधारी सिंह दिनकर", lang:"hindi", emoji:"⚔️", desc:"कर्ण के जीवन पर आधारित महाकाव्य - धर्म और नियति का संघर्ष।" },
  { id:6, title:"मधुशाला", author:"हरिवंश राय बच्चन", lang:"hindi", emoji:"🍷", desc:"जीवन के दर्शन को मधुशाला के रूपक में प्रस्तुत करती कालजयी रचना।" },
  { id:7, title:"श्यामची आई", author:"साने गुरुजी", lang:"marathi", emoji:"👩‍👦", desc:"आईच्या प्रेम आणि त्यागाची हृदयस्पर्शी कथा - मराठी साहित्यातील अमर कृति।" },
  { id:8, title:"ययाति", author:"वि. स. खांडेकर", lang:"marathi", emoji:"👑", desc:"मानवी इच्छा आणि नैतिकतेचा संघर्ष दाखवणारी ज्ञानपीठ पुरस्कृत कादंबरी।" },
  { id:9, title:"पानिपत", author:"विश्वास पाटील", lang:"marathi", emoji:"🏹", desc:"पानिपतच्या तिसऱ्या लढाईचा ऐतिहासिक आणि रोमांचक वृत्तांत।" },
  { id:10, title:"ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ", author:"ಡಿ.ವಿ.ಜಿ", lang:"kannada", emoji:"🕊️", desc:"ಜೀವನ ಸತ್ಯಗಳನ್ನು ಸಾರುವ ತಾತ್ವಿಕ ಕವನ ಸಂಕಲನ - ಕನ್ನಡದ ಭಗವದ್ಗೀತೆ।" },
  { id:11, title:"ಕರ್ವಾಲೋ", author:"ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ", lang:"kannada", emoji:"🦎", desc:"ಹಾರುವ ಓತಿಯ ಹುಡುಕಾಟದ ಸುತ್ತ ಹೆಣೆದ ವೈಜ್ಞಾನಿಕ ಕುತೂಹಲದ ಕಾದಂಬರಿ।" },
  { id:12, title:"ಗ್ರಾಮಾಯಣ", author:"ಕುವೆಂಪು", lang:"kannada", emoji:"🌿", desc:"ಮಲೆನಾಡಿನ ಹಳ್ಳಿಯ ಜೀವನ ಚಿತ್ರಣ - ಕನ್ನಡದ ಮೊದಲ ಮಹಾಕಾವ್ಯ।" },
  { id:13, title:"Koti Chennaya", author:"Traditional", lang:"tulu", emoji:"🤼", desc:"Tuluva folk heroes Koti and Chennaya - Story of twin warriors and justice." },
  { id:14, title:"Tulu Paddana", author:"Folk Collection", lang:"tulu", emoji:"🎶", desc:"Ancient Tulu oral epics - Siri, Koti Chennaya, Traditional songs of Tulunad." },
  { id:15, title:"Matter of Tulunad", author:"Amritha Someshwar", lang:"tulu", emoji:"🏝️", desc:"Culture, rituals, Daivaradhane and heritage of Tulunad in Tulu stories." },
];

const grid = document.getElementById('booksGrid');
const modal = document.getElementById('bookModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

function renderBooks(filter='all') {
  grid.innerHTML = '';
  const filtered = filter==='all' ? books : books.filter(b=>b.lang===filter);
  filtered.forEach(book=>{
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover">${book.emoji}</div>
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <span class="badge">${book.lang.toUpperCase()}</span>
      </div>
    `;
    card.addEventListener('click', ()=> openBook(book));
    grid.appendChild(card);
  });
}

function openBook(book) {
  modalBody.innerHTML = `
    <div style="text-align:center; font-size:4rem; margin-bottom:10px;">${book.emoji}</div>
    <h2 style="color:#d4af37; font-family:Playfair Display; text-align:center;">${book.title}</h2>
    <p style="text-align:center; opacity:0.7; margin:6px 0 15px;">by ${book.author} • ${book.lang.toUpperCase()}</p>
    <p style="line-height:1.6; opacity:0.9;">${book.desc}</p>
    <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
      <button onclick="alert('Reading feature coming soon!')" style="background:#d4af37; border:none; padding:10px 20px; border-radius:20px; cursor:pointer; font-weight:600;">Read Now</button>
      <button onclick="navigator.clipboard.writeText('${book.title}')" style="background:#334155; color:#fff; border:none; padding:10px 20px; border-radius:20px; cursor:pointer;">Share</button>
    </div>
  `;
  modal.classList.add('show');
}

closeBtn.onclick = ()=> modal.classList.remove('show');
window.onclick = (e)=> { if(e.target===modal) modal.classList.remove('show'); }

document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderBooks(btn.dataset.lang);
  });
});

renderBooks('all');
