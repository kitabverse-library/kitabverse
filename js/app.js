let books = [];
const resultsBox = document.getElementById('searchResults');
const searchInput = document.getElementById('searchInput');

fetch('./data/books.json')
  .then(r=>r.json())
  .then(d=>{books=d; console.log('Loaded', books.length)})
  .catch(e=>{console.error(e); resultsBox.innerHTML='<div class="result-item">Error loading books.json - check file</div>'; resultsBox.style.display='block'});

function showResults(list){
  if(!list || !list.length){
    resultsBox.innerHTML='<div class="result-item"><span>No books found</span></div>';
    resultsBox.style.display='block';
    return;
  }
  resultsBox.innerHTML = list.map(b=>`
    <div class="result-item"><strong>${b.title}</strong> - ${b.author}<span>${b.language} | ${b.category}</span></div>
  `).join('');
  resultsBox.style.display='block';
}

searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase().trim();
  if(!q){resultsBox.style.display='none';return}
  showResults(books.filter(b=>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q) ||
    b.language.toLowerCase().includes(q)
  ));
});

document.querySelectorAll('.lang-card').forEach(card=>{
  card.onclick=()=>{
    const lang = card.getAttribute('data-lang');
    searchInput.value = lang;
    showResults(books.filter(b=>b.language.toLowerCase()===lang.toLowerCase()));
  }
});

document.getElementById('featuredTab').onclick=()=>showResults(books.filter(b=>b.featured));
document.getElementById('trendingTab').onclick=()=>showResults(books.filter(b=>b.trending));

document.addEventListener('click',(e)=>{
  if(!e.target.closest('.search-row') && !e.target.closest('#searchResults') && !e.target.closest('.lang-card')){
    resultsBox.style.display='none';
  }
});
