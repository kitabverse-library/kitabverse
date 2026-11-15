let allBooks = [];
let currentFilter = 'featured';
let currentLang = 'all';
const demoBooks = [
 {id:1,title:"The Alchemist",author:"Paulo Coelho",language:"english",category:"Fiction",cover:"📖",trending:true,desc:"A shepherd's journey to find treasure."},
 {id:2,title:"Atomic Habits",author:"James Clear",language:"english",category:"Self-Help",cover:"📘",trending:true,desc:"Tiny changes, remarkable results."},
 {id:3,title:"Wings of Fire",author:"A.P.J. Abdul Kalam",language:"english",category:"Biography",cover:"🚀",trending:false,desc:"Autobiography of Dr. Kalam."},
 {id:4,title:"गोदान",author:"मुंशी प्रेमचंद",language:"hindi",category:"Novel",cover:"📙",trending:true,desc:"Classic Hindi novel by Premchand."},
 {id:5,title:"रश्मिरथी",author:"रामधारी सिंह दिनकर",language:"hindi",category:"Poetry",cover:"📗",trending:false,desc:"Epic poem on Karna."},
 {id:6,title:"मधुशाला",author:"हरिवंश राय बच्चन",language:"hindi",category:"Poetry",cover:"🍷",trending:false,desc:"Collection of quatrains."},
 {id:7,title:"Koti Chennaya",author:"Tulu Folklore",language:"tulu",category:"Folklore",cover:"🦁",trending:false,desc:"Legendary Tulu twin heroes."},
 {id:8,title:"Tulu Paddana",author:"Amrutha Someshwara",language:"tulu",category:"Culture",cover:"📜",trending:true,desc:"Traditional Tulu epic songs."},
 {id:9,title:"Paradana",author:"Tulu Heritage",language:"tulu",category:"Heritage",cover:"🏛️",trending:false,desc:"Tulu heritage stories."},
 {id:10,title:"Shivaji Maharaj",author:"Babasaheb Purandare",language:"marathi",category:"History",cover:"⚔️",trending:true,desc:"Life of Chhatrapati Shivaji."},
 {id:11,title:"Yakshagana",author:"Kota Shivaram",language:"kannada",category:"Art",cover:"🎭",trending:false,desc:"Traditional theatre form."},
 {id:12,title:"Kannada Sahitya",author:"Kuvempu",language:"kannada",category:"Literature",cover:"📚",trending:false,desc:"Gems of Kannada literature."}
];
async function loadBooks(){
 try{ const res=await fetch('./data/books.json'); if(res.ok){ allBooks=await res.json(); } else { allBooks=demoBooks; } }catch{ allBooks=demoBooks; }
 renderBooks(allBooks); document.getElementById('totalBooks').textContent=allBooks.length;
}
function renderBooks(books){
 const grid=document.getElementById('booksGrid'); if(!grid) return;
 if(books.length===0){ grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:30px">No books found. Try different search.</div>`; return; }
 grid.innerHTML=books.map(b=>`
  <div class="card" onclick="openBook(${b.id})">
   <div class="cover">${b.cover}</div><h3>${b.title}</h3><p>${b.author}</p><span class="badge">${b.language}</span>
   <div style="margin-top:6px;display:flex;gap:4px;justify-content:center;opacity:.7;font-size:9px">
    <span onclick="event.stopPropagation();speakText('${b.title.replace(/'/g,'')}')">🔊</span>
    <span onclick="event.stopPropagation();convertToBraille('${b.title.replace(/'/g,'')}');openModal('brailleModal')">⠃</span>
   </div>
  </div>`).join('');
}
function filterByLanguage(lang){ currentLang=lang; applyFilters(); }
function applyFilters(){
 let filtered=[...allBooks];
 if(currentLang!=='all') filtered=filtered.filter(b=>b.language===currentLang);
 if(currentFilter==='trending') filtered=filtered.filter(b=>b.trending);
 const q=document.getElementById('searchInput').value.toLowerCase().trim();
 if(q) filtered=filtered.filter(b=> b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.language.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
 renderBooks(filtered);
}
document.addEventListener('DOMContentLoaded',()=>{
 const inp=document.getElementById('searchInput'); if(inp) inp.addEventListener('input',applyFilters);
 document.querySelectorAll('.lang-card').forEach(c=>{ c.addEventListener('click',()=>{ document.querySelectorAll('.lang-card').forEach(x=>x.classList.remove('active')); c.classList.add('active'); filterByLanguage(c.dataset.lang); }); });
 const tabs=document.querySelectorAll('.tabs span');
 tabs.forEach(t=>{ t.addEventListener('click',()=>{ tabs.forEach(x=>x.classList.remove('active')); t.classList.add('active'); currentFilter=t.textContent.toLowerCase().includes('trend')?'trending':'featured'; applyFilters(); }); });
});
function openBook(id){
 const b=allBooks.find(x=>x.id===id); if(!b) return;
 document.getElementById('modalBody').innerHTML=`<div style="text-align:center"><div style="font-size:50px">${b.cover}</div><h2 style="color:#d4af37;margin-top:8px">${b.title}</h2><p>${b.author}</p><span class="badge">${b.language}</span> <span class="badge">${b.category}</span></div><p style="margin-top:14px;font-size:13px;line-height:1.6">${b.desc}</p>`;
 document.getElementById('bookModal').classList.add('show');
}
window.openBook=openBook; window.filterByLanguage=filterByLanguage; window.applyFilters=applyFilters;
loadBooks();
