const books=[
{id:1,title:"The Alchemist",author:"Paulo Coelho",lang:"english",cat:"featured",emoji:"📖",desc:"A shepherd boy's journey to find a worldly treasure becomes a discovery of the treasure within. Inspiring tale about following your dreams."},
{id:2,title:"Atomic Habits",author:"James Clear",lang:"english",cat:"trending",emoji:"📚",desc:"An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results."},
{id:3,title:"Wings of Fire",author:"A.P.J. Abdul Kalam",lang:"english",cat:"featured",emoji:"🚀",desc:"The autobiography of India's former President and Missile Man. Story of determination and success."},
{id:4,title:"गोदान",author:"प्रेमचंद",lang:"hindi",cat:"featured",emoji:"🌾",desc:"होरी नामक किसान की मार्मिक कहानी। भारतीय ग्रामीण जीवन और गरीबी का यथार्थ चित्रण। प्रेमचंद की अमर कृति।"},
{id:5,title:"रश्मिरथी",author:"दिनकर",lang:"hindi",cat:"trending",emoji:"⚔️",desc:"महाभारत के कर्ण के जीवन पर आधारित खंडकाव्य। दिनकर जी की ज्ञानपीठ पुरस्कृत रचना।"},
{id:6,title:"मधुशाला",author:"बच्चन",lang:"hindi",cat:"featured",emoji:"🍷",desc:"हरिवंश राय बच्चन की प्रसिद्ध कविता। जीवन के दर्शन को मधुशाला के प्रतीक से समझाती है।"},
{id:7,title:"श्यामची आई",author:"साने गुरुजी",lang:"marathi",cat:"featured",emoji:"👩‍👦",desc:"एका आईच्या प्रेमाची आणि त्यागाची हृदयस्पर्शी कथा। प्रत्येक मराठी माणसाने वाचावे असे पुस्तक।"},
{id:8,title:"ययाति",author:"वि.स.खांडेकर",lang:"marathi",cat:"trending",emoji:"👑",desc:"ज्ञानपीठ पुरस्कार विजेती कादंबरी। मानवी इच्छा, वासना आणि नीतिमत्तेचा संघर्ष।"},
{id:9,title:"पानिपत",author:"विश्वास पाटील",lang:"marathi",cat:"featured",emoji:"🏹",desc:"१७६१ मधील पानिपतच्या तिसऱ्या लढाईचा थरारक इतिहास। मराठ्यांच्या शौर्याची गाथा।"},
{id:10,title:"ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ",author:"ಡಿ.ವಿ.ಜಿ",lang:"kannada",cat:"featured",emoji:"🕊️",desc:"ಜೀವನದ ಸತ್ಯವನ್ನು ಬಿಂಬಿಸುವ ೯೪೫ ಪದ್ಯಗಳ ತಾತ್ವಿಕ ಕಾವ್ಯ। ಕನ್ನಡದ ಭಗವದ್ಗೀತೆ ಎಂದು ಪ್ರಸಿದ್ಧ।"},
{id:11,title:"ಕರವಾಲೋ",author:"ತೇಜಸ್ವಿ",lang:"kannada",cat:"trending",emoji:"🦎",desc:"ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ ಅವರ ವೈಜ್ಞಾನಿಕ ಕುತೂಹಲದ ಕಾದಂಬರಿ। ಹಾರುವ ಓತಿಯ ಶೋಧದ ರೋಚಕ ಕಥೆ।"},
{id:12,title:"ಗ್ರಾಮಾಯಣ",author:"ಕುವೆಂಪು",lang:"kannada",cat:"featured",emoji:"🌿",desc:"ಮಲೆನಾಡಿನ ಹಳ್ಳಿಯ ಜೀವನದ ಸುಂದರ ಚಿತ್ರಣ। ಕುವೆಂಪು ಅವರ ಜ್ಞಾನಪೀಠ ಪುರಸ್ಕೃತ ಮಹಾಕಾವ್ಯ।"},
{id:13,title:"Koti Chennaya",author:"Folk Legend",lang:"tulu",cat:"featured",emoji:"🤼",desc:"Tulunadu's legendary twin heroes Koti and Chennaya. Story of bravery, justice and sacrifice. Pride of Tulu culture."},
{id:14,title:"Tulu Paddana",author:"Folk Collection",lang:"tulu",cat:"trending",emoji:"🎶",desc:"Ancient Tulu oral epics - Siri, Koti-Chennaya, traditional Daivaradhane songs. Soul of Tulunad."},
{id:15,title:"Paradana",author:"Amritha S.",lang:"tulu",cat:"featured",emoji:"🏝️",desc:"Culture, rituals and heritage of Tulunad. Daiva, Kola, Nema and ancient Tulu traditions explained."}
];

const grid=document.getElementById('booksGrid');
const modal=document.getElementById('bookModal');
const modalBody=document.getElementById('modalBody');
const searchInput=document.getElementById('searchInput');
let currentLang='all';
let currentTab='featured';

function render(){
 let filtered=books;
 if(currentLang!=='all') filtered=filtered.filter(b=>b.lang===currentLang);
 const q=searchInput.value.toLowerCase().trim();
 if(q) filtered=filtered.filter(b=> (b.title+b.author+b.lang).toLowerCase().includes(q));
 grid.innerHTML='';
 if(filtered.length===0){grid.innerHTML='<p style="grid-column:1/-1;text-align:center;opacity:.6;padding:30px">No books found in this language</p>';return}
 filtered.forEach(book=>{
   const card=document.createElement('div');
   card.className='book-card';
   card.innerHTML=`<div class="book-cover">${book.emoji}</div><div class="book-info"><h3>${book.title}</h3><p>${book.author}</p><span class="badge">${book.lang.toUpperCase()}</span></div>`;
   card.onclick=()=>openBook(book);
   grid.appendChild(card);
 });
}

function openBook(book){
 modalBody.innerHTML=`<div style="text-align:center;font-size:50px;margin-bottom:8px">${book.emoji}</div><h2 style="color:#d4af37;font-family:Playfair Display;text-align:center;font-size:20px">${book.title}</h2><p style="text-align:center;opacity:.7;font-size:12px;margin:6px 0 14px">by ${book.author} • ${book.lang.toUpperCase()} • ${book.cat.toUpperCase()}</p><p style="line-height:1.6;font-size:13px;opacity:.9">${book.desc}</p><div style="margin-top:18px;display:flex;gap:8px;justify-content:center"><button onclick="alert('Reader coming soon!')" style="background:#d4af37;border:none;padding:9px 18px;border-radius:20px;font-weight:600;cursor:pointer">📖 Read Now</button><button onclick="navigator.clipboard.writeText('${book.title}');alert('Link copied!')" style="background:#1e2d5a;color:#fff;border:none;padding:9px 18px;border-radius:20px;cursor:pointer">Share</button></div>`;
 modal.classList.add('show');
}

document.querySelector('.close').onclick=()=>modal.classList.remove('show');
window.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};

document.querySelectorAll('.lang-btn').forEach(btn=>{
 btn.addEventListener('click',()=>{
   document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
   btn.classList.add('active');
   currentLang=btn.dataset.lang;
   render();
 });
});

searchInput.addEventListener('input',render);
render();
