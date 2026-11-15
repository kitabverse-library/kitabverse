const languages=['english','hindi','marathi','kannada','tulu'];
async function autoFetchSecured(lang){
 try{
  const c=document.getElementById(`${lang}-books`); if(!c) return;
  c.innerHTML='<div style="opacity:.6">Loading from secured sites...</div>';
  const ol=await fetch(`https://openlibrary.org/search.json?q=language:${lang}&has_fulltext=true&limit=3`).then(r=>r.json());
  const gb=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${lang}&filter=free-ebooks&maxResults=2`).then(r=>r.json());
  c.innerHTML=''; 
  (ol.docs||[]).slice(0,3).forEach(b=>{
    let d=document.createElement('div'); d.textContent=b.title; d.style.marginTop='4px'; c.appendChild(d)
  });
  (gb.items||[]).slice(0,2).forEach(b=>{
    let d=document.createElement('div'); d.textContent=b.volumeInfo.title; d.style.marginTop='4px'; c.appendChild(d)
  });
  if(c.innerHTML==='') c.innerHTML='<div>No books - Admin can add</div>';
 }catch(e){
  document.getElementById(`${lang}-books`).innerHTML='<div style="opacity:.6">Admin can add books here</div>';
 }
}
window.addEventListener('DOMContentLoaded',()=>{languages.forEach(l=>autoFetchSecured(l))});
function startVoiceSearch(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){alert('Voice not supported on this browser'); return}
 const rec=new SR(); rec.lang='en-IN'; rec.start();
 rec.onstart=()=>{document.getElementById('searchInput').placeholder='Listening... Speak now';};
 rec.onresult=e=>{document.getElementById('searchInput').value=e.results[0][0].transcript; searchBooks();};
 rec.onerror=()=>{document.getElementById('searchInput').placeholder='Search by book title...';}
}
function searchBooks(){
 const q=document.getElementById('searchInput').value.trim();
 if(!q) return;
 alert(`Searching: ${q} in English, Hindi, Marathi, Kannada, Tulu`);
 languages.forEach(l=>autoFetchSecured(l));
}
function enableOffline(){alert('Offline access enabled - Download and read
