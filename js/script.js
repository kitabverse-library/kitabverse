let allBooks = [];
let currentFilter = 'featured';
let currentLang = 'all';

const demoBooks = [
 // ENGLISH 3
 {id:1,title:"The Alchemist",author:"Paulo Coelho",language:"english",category:"Fiction",cover:"📖",trending:true,desc:"A shepherd's journey to find treasure - English bestseller."},
 {id:2,title:"Atomic Habits",author:"James Clear",language:"english",category:"Self-Help",cover:"📘",trending:true,desc:"Tiny changes, remarkable results - Build good habits."},
 {id:3,title:"Wings of Fire",author:"A.P.J. Abdul Kalam",language:"english",category:"Biography",cover:"🚀",trending:false,desc:"Autobiography of Dr. Kalam - Inspiration for youth."},
 // HINDI 3
 {id:4,title:"गोदान",author:"मुंशी प्रेमचंद",language:"hindi",category:"Novel",cover:"📙",trending:true,desc:"Classic Hindi novel by Premchand - Hindi sahitya."},
 {id:5,title:"रश्मिरथी",author:"रामधारी सिंह दिनकर",language:"hindi",category:"Poetry",cover:"📗",trending:false,desc:"Epic poem on Karna - Hindi mahakavya."},
 {id:6,title:"मधुशाला",author:"हरिवंश राय बच्चन",language:"hindi",category:"Poetry",cover:"🍷",trending:false,desc:"Collection of quatrains - Hindi classic by Bachchan."},
 // MARATHI 3
 {id:7,title:"Shivaji Maharaj",author:"Babasaheb Purandare",language:"marathi",category:"History",cover:"⚔️",trending:true,desc:"Life of Chhatrapati Shivaji - Marathi history."},
 {id:8,title:"Mrutyunjay",author:"Shivaji Sawant",language:"marathi",category:"Novel",cover:"📕",trending:true,desc:"Story of Karna - Famous Marathi novel."},
 {id:9,title:"Shyamchi Aai",author:"Sane Guruji",language:"marathi",category:"Biography",cover:"👩‍👦",trending:false,desc:"Loving mother story - Heart touching Marathi book."},
 // KANNADA 3
 {id:10,title:"Yakshagana",author:"Kota Shivaram Karanth",language:"kannada",category:"Art",cover:"🎭",trending:false,desc:"Traditional theatre form - Karnataka art heritage."},
 {id:11,title:"Kannada Sahitya",author:"Kuvempu",language:"kannada",category:"Literature",cover:"📚",trending:true,desc:"Gems of Kannada literature by Kuvempu."},
 {id:12,title:"Mookajjiya Kanasugalu",author:"Shivaram Karanth",language:"kannada",category:"Novel",cover:"🌊",trending:false,desc:"Jnanpith award winning Kannada novel."},
 // TULU 3
 {id:13,title:"Koti Chennaya",author:"Tulu Folklore",language:"tulu",category:"Folklore",cover:"🦁",trending:true,desc:"Legendary Tulu twin heroes - Tulu culture pride."},
 {id:14,title:"Tulu Paddana",author:"Amrutha Someshwara",language:"tulu",category:"Culture",cover:"📜",trending:true,desc:"Traditional Tulu epic songs - Ancient Tulu heritage."},
 {id:15,title:"Paradana",author:"Tulu Heritage",language:"tulu",category:"Heritage",cover:"🏛️",trending:false,desc:"Tulu heritage stories - Ancient traditions."},
 // BRAILLE 1 SPECIAL
 {id:16,title:"Braille Learning",author:"Louis Braille",language:"braille",category:"Braille",cover:"⠃",trending:true,desc:"Learn Braille - Touch to read - For visually impaired - ⠅⠊⠞⠁⠃⠧⠑⠗⠎⠑ - Special book in Braille."}
];

async function loadBooks(){
 try{
  const res = await fetch('./data/books.json');
  if(res.ok){ 
    allBooks = await res.json(); 
    if(!allBooks || allBooks.length===0) allBooks = demoBooks;
  } else { 
    allBooks = demoBooks; 
  }
 }catch{ 
  allBooks = demoBooks; 
 }
 renderBooks(allBooks);
 const el = document.getElementById('totalBooks');
 if(el) el.textContent = allBooks.length;
}

function renderBooks(books){
 const grid = document.getElementById('booksGrid');
 if(!grid) return;
 if(books.length===0){
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px">No books found. Try different search.</div>`;
  return;
 }
 grid.innerHTML = books.map(b=>`
  <div class="card" onclick="openBook(${b.id})">
   <div class="cover">${b.cover}</div>
   <h3>${b.title}</h3>
   <p>${b.author}</p>
   <span class="badge">${b.language}</span>
   <div style="margin-top:6px;display:flex;gap:4px;justify-content:center;opacity:.7;font-size:9px">
    <span onclick="event.stopPropagation();speakText('${b.title.replace(/'/g,'')}')">🔊</span>
    <span onclick="event.stopPropagation();convertToBraille('${b.title.replace(/'/g,'')}');openModal('brailleModal')">⠃</span>
   </div>
  </div>
 `).join('');
}

function filterByLanguage(lang){
 currentLang = lang;
 applyFilters();
}

function applyFilters(){
 let filtered = [...allBooks];
 if(currentLang!=='all') filtered = filtered.filter(b=>b.language===currentLang);
 if(currentFilter==='trending') filtered = filtered.filter(b=>b.trending);
 const q = document.getElementById('searchInput').value.toLowerCase().trim();
 if(q) filtered = filtered.filter(b=> 
  b.title.toLowerCase().includes(q) || 
  b.author.toLowerCase().includes(q) || 
  b.language.toLowerCase().includes(q) || 
  b.category.toLowerCase().includes(q)
 );
 renderBooks(filtered);
}

document.addEventListener('DOMContentLoaded',()=>{
 const inp = document.getElementById('searchInput');
 if(inp) inp.addEventListener('input',applyFilters);
 document.querySelectorAll('.lang-card').forEach(c=>{
  c.addEventListener('click',()=>{
   document.querySelectorAll('.lang-card').forEach(x=>x.classList.remove('active'));
   c.classList.add('active');
   filterByLanguage(c.dataset.lang);
  });
 });
 const tabs = document.querySelectorAll('.tabs span');
 tabs.forEach(t=>{
  t.addEventListener('click',()=>{
   tabs.forEach(x=>x.classList.remove('active'));
   t.classList.add('active');
   currentFilter = t.textContent.toLowerCase().includes('trend') ? 'trending' : 'featured';
   applyFilters();
  });
 });
});

function openBook(id){
 const b = allBooks.find(x=>x.id===id);
 if(!b) return;
 document.getElementById('modalBody').innerHTML = `
  <div style="text-align:center">
   <div style="font-size:50px">${b.cover}</div>
   <h2 style="color:#d4af37;margin-top:8px">${b.title}</h2>
   <p>${b.author}</p>
   <span class="badge">${b.language}</span> 
   <span class="badge">${b.category}</span>
  </div>
  <p style="margin-top:14px;font-size:13px;line-height:1.6">${b.desc}</p>
 `;
 document.getElementById('bookModal').classList.add('show');
}

window.openBook = openBook;
window.filterByLanguage = filterByLanguage;
window.applyFilters = applyFilters;
loadBooks();
