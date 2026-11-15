let allBooks = [];
let currentFilter = 'featured';
let currentLang = 'all';
const demoBooks = [
 {id:1,title:"The Alchemist",author:"Paulo Coelho",language:"english",category:"Fiction",cover:"📖",trending:true,desc:"A shepherd's journey to find treasure - English bestseller."},
 {id:2,title:"Atomic Habits",author:"James Clear",language:"english",category:"Self-Help",cover:"📘",trending:true,desc:"Tiny changes, remarkable results."},
 {id:3,title:"Wings of Fire",author:"A.P.J. Abdul Kalam",language:"english",category:"Biography",cover:"🚀",trending:false,desc:"Autobiography of Dr. Kalam."},
 {id:4,title:"गोदान",author:"मुंशी प्रेमचंद",language:"hindi",category:"Novel",cover:"📙",trending:true,desc:"Classic Hindi novel by Premchand."},
 {id:5,title:"रश्मिरथी",author:"रामधारी सिंह दिनकर",language:"hindi",category:"Poetry",cover:"📗",trending:false,desc:"Epic poem on Karna."},
 {id:6,title:"मधुशाला",author:"हरिवंश राय बच्चन",language:"hindi",category:"Poetry",cover:"🍷",trending:false,desc:"Collection of quatrains by Bachchan."},
 {id:7,title:"Shivaji Maharaj",author:"Babasaheb Purandare",language:"marathi",category:"History",cover:"⚔️",trending:true,desc:"Life of Chhatrapati Shivaji."},
 {id:8,title:"Mrutyunjay",author:"Shivaji Sawant",language:"marathi",category:"Novel",cover:"📕",trending:true,desc:"Story of Karna - Famous Marathi novel."},
 {id:9,title:"Shyamchi Aai",author:"Sane Guruji",language:"marathi",category:"Biography",cover:"👩‍👦",trending:false,desc:"Loving mother story - Marathi book."},
 {id:10,title:"Yakshagana",author:"Kota Shivaram Karanth",language:"kannada",category:"Art",cover:"🎭",trending:false,desc:"Traditional theatre form - Karnataka art."},
 {id:11,title:"Kannada Sahitya",author:"Kuvempu",language:"kannada",category:"Literature",cover:"📚",trending:true,desc:"Gems of Kannada literature by Kuvempu."},
 {id:12,title:"Mookajjiya Kanasugalu",author:"Shivaram Karanth",language:"kannada",category:"Novel",cover:"🌊",trending:false,desc:"Jnanpith award winning Kannada novel."},
 {id:13,title:"Koti Chennaya",author:"Tulu Folklore",language:"tulu",category:"Folklore",cover:"🦁",trending:true,desc:"Legendary Tulu twin heroes."},
 {id:14,title:"Tulu Paddana",author:"Amrutha Someshwara",language:"tulu",category:"Culture",cover:"📜",trending:true,desc:"Traditional Tulu epic songs."},
 {id:15,title:"Paradana",author:"Tulu Heritage",language:"tulu",category:"Heritage",cover:"🏛️",trending:false,desc:"Tulu heritage stories."},
 {id:16,title:"Braille Learning",author:"Louis Braille",language:"braille",category:"Braille",cover:"⠃",trending:true,desc:"Learn Braille - Touch to read - For visually impaired - ⠅⠊⠞⠁⠃⠧⠑⠗⠎⠑"}
];
async function loadBooks(){
 try{ const res=await fetch('./data/books.json'); if(res.ok){ allBooks=await res.json(); if(!allBooks||!allBooks.length) allBooks=demoBooks; } else allBooks=demoBooks; }catch{ allBooks=demoBooks; }
 renderBooks(allBooks); const el=document.getElementById('totalBooks'); if(el) el.textContent=allBooks.length;
}
function renderBooks(books){
 const grid=document.getElementById('booksGrid'); if(!grid) return;
 if(books.length===0){ grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:30px">No books found.</div>`; return; }
 grid.innerHTML=books.map(b=>`
  <div class="card" data-id="${b.id}" onclick="openBook(${b.id})" ontouchstart="handleTouchStart(event)" ontouchend="handleTouchEnd(event,${b.id})">
   <div class="cover">${b.cover}</div><h3>${b.title}</h3><p>${b.author}</p><span class="badge">${b.language}</span>
   <div style="margin-top:6px;display:flex;gap:8px;justify-content:center;opacity:.8;font-size:11px">
    <span style="padding:6px" onclick="event.stopPropagation();speakText('${b.title.replace(/'/g,'')}')">🔊</span>
    <span style="padding:6px" onclick="event.stopPropagation();convertToBraille('${b.title.replace(/'/g,'')}');openModal('brailleModal')">⠃</span>
   </div>
  </div>`).join('');
}
function filterByLanguage(lang){ currentLang=lang; applyFilters(); document.getElementById('sideMenu').classList.remove('show'); }
function applyFilters(){
 let filtered=[...allBooks];
 if(currentLang!=='all') filtered=filtered.filter(b=>b.language===currentLang);
 if(currentFilter==='trending') filtered=filtered.filter(b=>b.trending);
 const q=document.getElementById('searchInput').value.toLowerCase().trim();
 if(q) filtered=filtered.filter(b=> b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.language.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
 renderBooks(filtered);
}
let touchStartTime=0, touchStartX=0, lastTap=0, longPressTimer=null;
function handleTouchStart(e){ touchStartTime=Date.now(); touchStartX=e.touches[0].clientX; const id=e.currentTarget.dataset.id; longPressTimer=setTimeout(()=>{ const b=allBooks.find(x=>x.id==id); if(b){ convertToBraille(b.title); openModal('brailleModal'); navigator.vibrate&&navigator.vibrate(50); } },600); }
function handleTouchEnd(e,id){
 clearTimeout(longPressTimer);
 const touchEndTime=Date.now(); const diff=touchEndTime-touchStartTime; const touchEndX=e.changedTouches[0].clientX; const deltaX=touchEndX-touchStartX;
 if(Math.abs(deltaX)>80){ if(deltaX>0) swipeAction('right'); else swipeAction('left'); return; }
 if(diff<300){ const currentTime=new Date().getTime(); const tapLength=currentTime-lastTap; if(tapLength<500 && tapLength>0){ const b=allBooks.find(x=>x.id==id); if(b){ speakText(b.title+' by '+b.author); navigator.vibrate&&navigator.vibrate([50,30,50]); e.preventDefault(); } } lastTap=currentTime; }
}
function swipeAction(dir){
 if(dir==='left'){ const tabs=document.querySelectorAll('.tabs span'); if(tabs[0].classList.contains('active')) tabs[1].click(); }
 if(dir==='right'){ const tabs=document.querySelectorAll('.tabs span'); if(tabs[1].classList.contains('active')) tabs[0].click(); }
}
window.handleTouchStart=handleTouchStart; window.handleTouchEnd=handleTouchEnd;
document.addEventListener('DOMContentLoaded',()=>{
 const inp=document.getElementById('searchInput'); if(inp) inp.addEventListener('input',applyFilters);
 const tabs=document.querySelectorAll('.tabs span');
 tabs.forEach(t=>{ t.addEventListener('click',()=>{ tabs.forEach(x=>x.classList.remove('active')); t.classList.add('active'); currentFilter=t.textContent.toLowerCase().includes('trend')?'trending':'featured'; applyFilters(); }); });
 let startX=0; const grid=document.getElementById('booksGrid');
 if(grid){ grid.addEventListener('touchstart',e=>{ startX=e.touches[0].clientX; }, {passive:true}); grid.addEventListener('touchend',e=>{ const endX=e.changedTouches[0].clientX; const diff=endX-startX; if(Math.abs(diff)>100){ if(diff<0) swipeAction('left'); else swipeAction('right'); } }, {passive:true}); }
});
function openBook(id){
 const b=allBooks.find(x=>x.id===id); if(!b) return;
 document.getElementById('modalBody').innerHTML=`<div style="text-align:center"><div style="font-size:50px">${b.cover}</div><h2 style="color:#d4af37;margin-top:8px">${b.title}</h2><p>${b.author}</p><span class="badge">${b.language}</span> <span class="badge">${b.category}</span></div><p style="margin-top:14px;font-size:13px;line-height:1.6">${b.desc}</p>`;
 document.getElementById('bookModal').classList.add('show'); if(navigator.vibrate) navigator.vibrate(20);
}
window.openBook=openBook; window.filterByLanguage=filterByLanguage; window.applyFilters=applyFilters;
loadBooks();
