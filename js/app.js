const books=[
{title:"Wings of Fire",author:"A.P.J Abdul Kalam",cat:"english",lang:"English",emoji:"📘"},
{title:"Discovery of India",author:"Jawaharlal Nehru",cat:"english",lang:"English",emoji:"🇮🇳"},
{title:"Atomic Habits",author:"James Clear",cat:"english",lang:"English",emoji:"⚡"},
{title:"Madhushala",author:"Harivansh Rai Bachchan",cat:"hindi",lang:"Hindi",emoji:"📖"},
{title:"Godan",author:"Munshi Premchand",cat:"hindi",lang:"Hindi",emoji:"📚"},
{title:"Raag Darbari",author:"Shrilal Shukla",cat:"hindi",lang:"Hindi",emoji:"📗"},
{title:"Shyamchi Aai",author:"Sane Guruji",cat:"marathi",lang:"Marathi",emoji:"📙"},
{title:"Yayati",author:"V.S. Khandekar",cat:"marathi",lang:"Marathi",emoji:"📕"},
{title:"Panipat",author:"Vishwas Patil",cat:"marathi",lang:"Marathi",emoji:"🏛️"},
{title:"Mookajjiya Kanasugalu",author:"Shivaram Karanth",cat:"kannada",lang:"Kannada",emoji:"📓"},
{title:"Karvalo",author:"Poornachandra Tejaswi",cat:"kannada",lang:"Kannada",emoji:"📝"},
{title:"Parva",author:"S.L. Bhyrappa",cat:"kannada",lang:"Kannada",emoji:"📒"},
{title:"Tulu Janapada Kathegalu",author:"Traditional",cat:"tulu",lang:"Tulu",emoji:"🌾"},
{title:"Mogaveera Charitre",author:"Tulu Sahitya",cat:"tulu",lang:"Tulu",emoji:"🐚"},
{title:"Tulu Paadana",author:"Folk Collection",cat:"tulu",lang:"Tulu",emoji:"🎶"},
{title:"Braille Learning Guide",author:"KitabVerse",cat:"braille",lang:"Braille",emoji:"🤲"}
];
let currentCat='all';let currentBook=null;
function speakText(text){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.lang='en-IN';u.rate=0.9;speechSynthesis.speak(u);}
function stopSpeak(){speechSynthesis.cancel();}
function speakVision(){let t=document.getElementById('visionText')?.innerText||"Welcome To KitabVerse - Read Share Connect. Library For All With Advanced Features. My Vision is inclusive library for those who can't see, can hear and can speak.";speakText(t);openModal('visionModal');}
function speakBook(){if(currentBook)speakText(`${currentBook.title} by ${currentBook.author} in ${currentBook.lang}. Part of KitabVerse voice enabled library.`);}
function startVoiceSearch(){let Rec=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Rec){alert('Voice not supported');return;}let rec=new Rec();rec.lang='en-IN';rec.start();rec.onresult=function(e){let q=e.results[0][0].transcript;document.getElementById('searchInput').value=q;searchBooks(q);speakText(`Searching for ${q}`);};}
function openBook(i){currentBook=books[i];let b=currentBook;document.getElementById('bookModalTitle').innerText=b.emoji+' '+b.title;document.getElementById('bookModalDesc').innerHTML=`<b>Title:</b> ${b.title}<br><b>Author:</b> ${b.author}<br><b>Language:</b> ${b.lang}<br><br>Voice enabled for blind users who can hear and speak.`;openModal('bookModal');speakText(`${b.title} by ${b.author}. Language ${b.lang}.`);}
function render(list){const grid=document.getElementById('bookGrid');grid.innerHTML=list.map(b=>{let idx=books.indexOf(b);return `<div class="card" onclick="openBook(${idx})"><div class="cover">${b.emoji}</div><h3>${b.title}</h3><p>${b.author}</p><span class="badge">${b.lang.toUpperCase()}</span></div>`;}).join('');}
function filterBooks(cat,el){currentCat=cat;document.querySelectorAll('.tabs span').forEach(s=>s.classList.remove('active'));if(el)el.classList.add('active');if(cat==='all')render(books);else render(books.filter(b=>b.cat===cat));}
function searchBooks(q){q=q.toLowerCase().trim();if(!q){currentCat==='all'?render(books):render(books.filter(b=>b.cat===currentCat));return;}render(books.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)||b.lang.toLowerCase().includes(q)));}
function doSearch(){searchBooks(document.getElementById('searchInput').value);}
function clearSearch(){document.getElementById('searchInput').value='';searchBooks('');}
function openModal(id){document.getElementById(id).classList.add('show');}
function closeModal(id){document.getElementById(id).classList.remove('show');stopSpeak();}
function toggleMenu(){document.getElementById('menuDrawer').classList.toggle('show');}
document.addEventListener('DOMContentLoaded',()=>{render(books);});
