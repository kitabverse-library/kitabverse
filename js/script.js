let allBooks=[];
const grid=document.getElementById('booksGrid'), modal=document.getElementById('bookModal'), modalBody=document.getElementById('modalBody'), search=document.getElementById('searchInput');
let curLang='all';

fetch('./data/books.json').then(r=>r.json()).then(data=>{allBooks=data;render();});

function render(){
 let list=allBooks;
 if(curLang!=='all') list=list.filter(b=>b.lang===curLang);
 const q=search.value.toLowerCase().trim();
 if(q) list=list.filter(b=>(b.title+b.author+b.lang).toLowerCase().includes(q));
 grid.innerHTML='';
 if(!list.length){grid.innerHTML='<p style="grid-column:1/-1;text-align:center;opacity:.6;padding:20px">No books in this language</p>';return;}
 list.forEach(b=>{
  const d=document.createElement('div');d.className='card';
  d.innerHTML=`<div class="cover">${b.emoji}</div><h3>${b.title}</h3><p>${b.author}</p><span class="badge">${b.lang.toUpperCase()}</span>`;
  d.onclick=()=>openBook(b);grid.appendChild(d);
 });
}
function openBook(b){
 modalBody.innerHTML=`<div style="text-align:center;font-size:48px">${b.emoji}</div><h2 style="color:#d4af37;text-align:center;margin:6px 0">${b.title}</h2><p style="text-align:center;opacity:.6;font-size:11px">${b.author} • ${b.lang.toUpperCase()}</p><p style="margin-top:12px;line-height:1.6;font-size:13px">${b.desc}</p><div style="text-align:center;margin-top:16px"><button onclick="alert('Reader soon!')" style="background:#d4af37;border:none;padding:8px 18px;border-radius:20px;font-weight:700">📖 Read Now</button></div>`;
 modal.classList.add('show');
}
document.querySelector('.close').onclick=()=>modal.classList.remove('show');
window.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
document.querySelectorAll('.lang').forEach(btn=>{btn.onclick=()=>{document.querySelectorAll('.lang').forEach(x=>x.classList.remove('active'));btn.classList.add('active');curLang=btn.dataset.lang;render();}});
search.addEventListener('input',render);
