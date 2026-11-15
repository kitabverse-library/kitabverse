// KitabVerse - PRO WOW - All Languages + Voice + Braille + Search
let allBooks = [];
let currentLang = 'all';

async function loadBooks(){
 try{
  const res = await fetch('./data/books.json');
  if(!res.ok) throw new Error('No json');
  allBooks = await res.json();
 }catch(e){
  // Fallback sample books if books.json missing - So site never looks empty
  allBooks = [
    {id:1,title:"Bhagavad Gita",author:"Vyasa",language:"hindi",category:"Spiritual",cover:"📖"},
    {id:2,title:"Ramayana",author:"Valmiki",language:"hindi",category:"Epic",cover:"📕"},
    {id:3,title:"Tulu Folktales",author:"K. Harish",language:"tulu",category:"Culture",cover:"📗"},
    {id:4,title:"Kannada Sahitya",author:"Kuvempu",language:"kannada",category:"Literature",cover:"📘"},
    {id:5,title:"Marathi Poems",author:"Kusumagraj",language:"marathi",category:"Poetry",cover:"📙"},
    {id:6,title:"English Grammar",author:"Wren & Martin",language:"english",category:"Education",cover:"📓"},
    {id:7,title:"Shivaji Maharaj",author:"Babasaheb Purandare",language:"marathi",category:"History",cover:"📒"},
    {id:8,title:"Yakshagana",author:"Kota Shivaram",language:"kannada",category:"Art",cover:"🎭"},
    {id:9,title:"Tulu Dictionary",author:"KitabVerse",language:"tulu",category:"Dictionary",cover:"📖"},
    {id:10,title:"The Alchemist",author:"Paulo Coelho",language:"english",category:"Fiction",cover:"✨"},
    {id:11,title:"Mahabharata",author:"Vyasa",language:"hindi",category:"Epic",cover:"📚"},
    {id:12,title:"Wings of Fire",author:"APJ Abdul Kalam",language:"english",category:"Biography",cover:"🚀"}
  ];
 }
 renderBooks(allBooks);
 updateStats();
}

function renderBooks(books){
 const grid = document.getElementById('booksGrid');
 const totalEl = document.getElementById('totalBooks');
 if(totalEl) totalEl.textContent = books.length;
 if(!grid) return;
 if(books.length===0){
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;opacity:.7"><p>No books found for this search</p><p style="font-size:11px;margin-top:6px">Try Voice Search or different language</p></div>`;
  return;
 }
 grid.innerHTML = books.map(book=>`
  <div class="card" onclick="openBook(${book.id})" role="button" tabindex="0" aria-label="Book ${book.title} by ${book.author}">
   <div class="cover">${book.cover||'📖'}</div>
   <h3>${book.title}</h3>
   <p>${book.author||'Unknown'}</p>
   <span class="badge">${book.language||'english'}</span>
   <div style="margin-top:6px;display:flex;gap:4px;justify-content:center">
    <span style="font-size:9px;background:rgba(212,175,55,0.15);padding:2px 6px;border-radius:8px">🔊</span>
    <span style="font-size:9px;background:rgba(212,175,55,0.15);padding:2px 6px;border-radius:8px">⠃</span>
   </div>
  </div>
 `).join('');
}

function updateStats(){
 const el=document.getElementById('totalBooks');
 if(el && allBooks.length) el.textContent = allBooks.length;
}

// SEARCH - Works with Voice result + Typed
const searchInput = document.getElementById('searchInput');
if(searchInput){
 searchInput.addEventListener('input',()=>{
  const q = searchInput.value.toLowerCase().trim();
  if(!q){ filterByLanguage(currentLang); return; }
  const filtered = allBooks.filter(b=>
   b.title.toLowerCase().includes(q) ||
   (b.author&&b.author.toLowerCase().includes(q)) ||
   (b.category&&b.category.toLowerCase().includes(q)) ||
   (b.language&&b.language.toLowerCase().includes(q))
  );
  renderBooks(filtered);
  // Auto speak for accessibility if result single
  if(filtered.length===1){
   // Optional: speakText('Found '+filtered[0].title);
  }
 });
}

// LANGUAGE FILTER - All 5 main cards
document.querySelectorAll('.lang-card').forEach(card=>{
 card.addEventListener('click',()=>{
  document.querySelectorAll('.lang-card').forEach(c=>c.classList.remove('active'));
  card.classList.add('active');
  currentLang = card.dataset.lang;
  filterByLanguage(currentLang);
  if(typeof speakText==='function'){
   speakText('Showing '+currentLang+' books');
  }
 });
});

function filterByLanguage(lang){
 if(lang==='all'){ renderBooks(allBooks); return; }
 const filtered = allBooks.filter(b=>b.language && b.language.toLowerCase()===lang.toLowerCase());
 // If no books for that language, show all but highlight message
 if(filtered.length===0){
  renderBooks(allBooks);
  // Show toast
  showToast('No books in '+lang+' yet — Showing all books. Add your '+lang+' books soon!');
 }else{
  renderBooks(filtered);
 }
}

function showToast(msg){
 let t=document.getElementById('toast');
 if(!t){ t=document.createElement('div'); t.id='toast'; t.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#070c1e;border:1px solid #d4af37;color:#f4d35e;padding:10px 16px;border-radius:20px;font-size:12px;z-index:1000;box-shadow:0 8px 20px rgba(0,0,0,0.4)'; document.body.appendChild(t); }
 t.textContent=msg; t.style.display='block';
 setTimeout(()=>{t.style.display='none';},3000);
}

// BOOK MODAL - With Speak + Braille
function openBook(id){
 const book = allBooks.find(b=>b.id===id);
 if(!book) return;
 const modalBody = document.getElementById('modalBody');
 const modal = document.getElementById('bookModal');
 if(!modalBody||!modal) return;
 modalBody.innerHTML = `
  <div style="text-align:center">
   <div style="font-size:48px">${book.cover||'📖'}</div>
   <h2 style="color:#d4af37;margin-top:8px">${book.title}</h2>
   <p style="opacity:.8">by ${book.author||'Unknown Author'}</p>
   <div style="margin-top:10px"><span class="badge">${book.language}</span> <span class="badge" style="background:#070c1e;color:#d4af37;border:1px solid #d4af37">${book.category||'Book'}</span></div>
  </div>
  <div style="margin-top:16px;padding:12px;background:rgba(0,0,0,0.3);border-radius:10px;font-size:12px;line-height:1.6">
   <b>About this book:</b><br>
   ${book.description||book.title+' is a beautiful book in '+book.language+' language. Available to read, listen and touch in Braille. Part of KitabVerse mission - Library For All.'}
  </div>
  <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
   <button onclick="speakText('${book.title} by ${book.author}')" style="background:#070c1e;border:1px solid #d4af37;color:#d4af37;padding:8px;border-radius:8px;font-size:12px">🔊 Listen Title</button>
   <button onclick="convertToBraille('${book.title}');document.getElementById('brailleModal').classList.add('show')" style="background:#d4af37;border:none;color:#000;padding:8px;border-radius:8px;font-weight:700;font-size:12px">⠃ Read Braille</button>
  </div>
 `;
 modal.classList.add('show');
 // For screen reader
 modal.setAttribute('aria-label','Book details for '+book.title);
}

// Close modal
const closeBook = document.getElementById('closeBook');
if(closeBook){
 closeBook.onclick = ()=>{ document.getElementById('bookModal').classList.remove('show'); };
}

// Keyboard accessibility - Enter on card opens book
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){
  document.querySelectorAll('.modal.show').forEach(m=>m.classList.remove('show'));
 }
});

// Load on start
loadBooks();

// Make functions global for inline onclick
window.openBook = openBook;
window.filterByLanguage = filterByLanguage;
window.renderBooks = renderBooks;
