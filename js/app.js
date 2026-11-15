// Phase 2A - Search LIVE - No UI change
let books = [];
fetch('data/books.json').then(r=>r.json()).then(d=>books=d);

const searchInput = document.querySelector('.search-box input');
const searchRow = document.querySelector('.search-row');
const resultsBox = document.createElement('div');
resultsBox.className = 'search-results';
searchRow.after(resultsBox);

function showResults(list){
  if(!list.length){resultsBox.style.display='none';return}
  resultsBox.innerHTML = list.map(b=>`
    <div class="result-item">
      <strong>${b.title}</strong> - ${b.author}
      <span>${b.language} | ${b.category}</span>
    </div>`).join('');
  resultsBox.style.display='block';
}

searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase().trim();
  if(!q){resultsBox.style.display='none';return}
  const filtered = books.filter(b=> 
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q) ||
    b.language.toLowerCase().includes(q)
  );
  showResults(filtered);
});

// Language filter - Same 5 cards - No new UI
document.querySelectorAll('.lang-card').forEach(card=>{
  card.style.cursor='pointer';
  card.onclick=()=>{
    const lang = card.querySelector('p').innerText;
    const filtered = books.filter(b=>b.language===lang);
    showResults(filtered);
    searchInput.value = lang;
  }
});

// Featured / Trending - Same text becomes tabs
document.querySelectorAll('.search-row span').forEach(tab=>{
  tab.style.cursor='pointer';
  tab.onclick=()=>{
    const isFeatured = tab.innerText.includes('Featured');
    const filtered = books.filter(b=> isFeatured? b.featured : b.trending);
    showResults(filtered);
  }
});

// Click outside closes
document.addEventListener('click',(e)=>{
  if(!e.target.closest('.search-row') && !e.target.closest('.search-results')){
    resultsBox.style.display='none';
  }
});
