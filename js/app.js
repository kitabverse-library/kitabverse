const demoBooks=[
{title:"Wings of Fire",author:"A.P.J. Abdul Kalam",lang:"English",category:"Biography"},
{title:"Gitanjali",author:"Rabindranath Tagore",lang:"English",category:"Poetry"},
{title:"Godan",author:"Premchand",lang:"Hindi",category:"Novel"},
{title:"Shyamchi Aai",author:"Sane Guruji",lang:"Marathi",category:"Biography"},
{title:"Mankuthimmana Kagga",author:"D.V. Gundappa",lang:"Kannada",category:"Poetry"},
{title:"Pardana",author:"Traditional",lang:"Tulu",category:"Folk"}
];
function showBooks(books){
const c=document.getElementById('searchResults');
c.style.display='block';c.innerHTML='';
books.forEach(b=>{
const d=document.createElement('div');d.className='result-item';
d.innerHTML=`<strong>${b.title} - ${b.author}</strong><span>${b.lang} | ${b.category}</span>`;
c.appendChild(d);
});
}
document.addEventListener('DOMContentLoaded',()=>{
setTimeout(()=>showBooks(demoBooks),500);
const inp=document.getElementById('searchInput');
if(inp){inp.addEventListener('input',(e)=>{
const q=e.target.value.toLowerCase().trim();
if(!q){showBooks(demoBooks);return;}
const f=demoBooks.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)||b.lang.toLowerCase().includes(q));
showBooks(f.length?f:demoBooks);
});}
const fb=document.getElementById('featuredBtn');
if(fb){fb.addEventListener('click',()=>showBooks(demoBooks));}
});
