let allBooks=[];
const grid=document.getElementById('booksGrid');
const modal=document.getElementById('bookModal');
const modalBody=document.getElementById('modalBody');
const search=document.getElementById('searchInput');
let curLang=null;

fetch('./data/books.json').then(r=>r.json()).then(data=>{allBooks=data;});

function render(){
 if(!curLang){grid.innerHTML='';return;}
 let list=allBooks.filter(b=>b.lang===curLang);
 const q=search.value.toLowerCase().trim();
 if(q) list=list.filter(b=>(b.title+b.author+b.lang).toLowerCase().includes(q));
 grid.innerHTML='';
 list.forEach(b=>{
  const d=document.createElement('div');d.className='card';
  d.innerHTML=`<div class="cover">${b.emoji}</div><h3>${b.title}</h3><p>${b.author}</p><span class="badge">${b.lang.toUpperCase()}</span>`;
  d.onclick=()=>openBook(b); grid.appendChild(d);
 });
}
function openBook(b){
 modalBody.innerHTML=`<div style="text-align:center;font-size:48px">${b.emoji}</div><h2 style="color:#d4af37;text-align:center;margin:8px 0">${b.title}</h2><p style="text-align:center;opacity:.6;font-size:11px">${b.author} • ${b.lang.toUpperCase()}</p><p style="margin-top:12px;line-height:1.6;font-size:13px">${b.desc}</p><div style="text-align:center;margin-top:16px"><button onclick="alert('Full reader coming soon!')" style="background:#d4af37;border:none;padding:9px 20px;border-radius:20px;font-weight:700;color:#000">📖 Read Now</button></div>`;
 modal.classList.add('show');
}
document.getElementById('closeBook').onclick=()=>modal.classList.remove('show');
window.onclick=e=>{if(e.target===modal)modal.classList.remove('show'); if(e.target===document.getElementById('visionModal'))document.getElementById('visionModal').classList.remove('show');};

document.querySelectorAll('.lang').forEach(btn=>{
 btn.onclick=()=>{
  document.querySelectorAll('.lang').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  curLang=btn.dataset.lang;
  render();
 };
});
search.addEventListener('input',render);
