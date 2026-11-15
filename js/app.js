const books=[
// English - 3
{title:"Wings of Fire",author:"A.P.J Abdul Kalam",cat:"english",lang:"English",emoji:"📘"},
{title:"Discovery of India",author:"Jawaharlal Nehru",cat:"english",lang:"English",emoji:"🇮🇳"},
{title:"Atomic Habits",author:"James Clear",cat:"english",lang:"English",emoji:"⚡"},
// Hindi - 3
{title:"Madhushala",author:"Harivansh Rai Bachchan",cat:"hindi",lang:"Hindi",emoji:"📖"},
{title:"Godan",author:"Munshi Premchand",cat:"hindi",lang:"Hindi",emoji:"📚"},
{title:"Raag Darbari",author:"Shrilal Shukla",cat:"hindi",lang:"Hindi",emoji:"📗"},
// Marathi - 3
{title:"Shyamchi Aai",author:"Sane Guruji",cat:"marathi",lang:"Marathi",emoji:"📙"},
{title:"Yayati",author:"V.S. Khandekar",cat:"marathi",lang:"Marathi",emoji:"📕"},
{title:"Panipat",author:"Vishwas Patil",cat:"marathi",lang:"Marathi",emoji:"🏛️"},
// Kannada - 3
{title:"Mookajjiya Kanasugalu",author:"Shivaram Karanth",cat:"kannada",lang:"Kannada",emoji:"📓"},
{title:"Karvalo",author:"Poornachandra Tejaswi",cat:"kannada",lang:"Kannada",emoji:"📝"},
{title:"Parva",author:"S.L. Bhyrappa",cat:"kannada",lang:"Kannada",emoji:"📒"},
// Tulu - 3
{title:"Tulu Janapada Kathegalu",author:"Traditional",cat:"tulu",lang:"Tulu",emoji:"🌾"},
{title:"Mogaveera Charitre",author:"Tulu Sahitya",cat:"tulu",lang:"Tulu",emoji:"🐚"},
{title:"Tulu Paadana",author:"Folk Collection",cat:"tulu",lang:"Tulu",emoji:"🎶"},
// Braille - 1
{title:"Braille Learning Guide",author:"KitabVerse",cat:"braille",lang:"Braille",emoji:"🤲"}
];
let currentCat='all';
function render(list){
const grid=document.getElementById('bookGrid');
grid.innerHTML=list.map(b=>`
<div class="card" onclick="alert('${b.title} (${b.lang}) - Coming Soon!')">
<div class="cover">${b.emoji}</div>
<h3>${b.title}</h3>
<p>${b.author}</p>
<span class="badge">${b.lang.toUpperCase()}</span>
</div>`).join('');
}
function filterBooks(cat,el){
currentCat=cat;
document.querySelectorAll('.tabs span').forEach(s=>s.classList.remove('active'));
if(el) el.classList.add('active');
if(cat==='all') render(books);
else render(books.filter(b=>b.cat===cat));
}
function searchBooks(q){
q=q.toLowerCase();
if(!q){currentCat==='all'?render(books):render(books.filter(b=>b.cat===currentCat));return;}
render(books.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)||b.lang.toLowerCase().includes(q)));
}
function doSearch(){searchBooks(document.getElementById('searchInput').value);}
function openModal(id){document.getElementById(id).classList.add('show');}
function closeModal(id){document.getElementById(id).classList.remove('show');}
function toggleMenu(){document.getElementById('menuDrawer').classList.toggle('show');}
function setLang(l){alert('Language '+l+' coming soon!');toggleMenu();}
document.addEventListener('DOMContentLoaded',()=>render(books));
