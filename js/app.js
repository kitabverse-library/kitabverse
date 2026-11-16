const ADMIN_PASS = 'KitabVerse@Mumbai26!';
const ADMIN_EMAIL = 'kitabverse.library@gmail.com';
const ADMIN_WHATSAPP = '918828350328';
let generatedOTP = '';

const defaultQuotes = [
{ text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.", author: "Dr. A.P.J. Abdul Kalam" },
{ text: "Education is the most powerful weapon which you can use to change the world.", author: "Dr. A.P.J. Abdul Kalam" },
{ text: "Books are a uniquely portable magic.", author: "Stephen King" },
{ text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
{ text: "Knowledge is power.", author: "Munshi Premchand" }
];

let customQuotes = JSON.parse(localStorage.getItem('kitabverse_custom_quotes') || '[]');
let allQuotes = [...defaultQuotes, ...customQuotes];
let day = new Date().getDate() % allQuotes.length;
let todayQuote = allQuotes[day];
let qEl = document.getElementById('dailyQuote');
let aEl = document.getElementById('quoteAuthor');
if(qEl) qEl.innerText = `"${todayQuote.text}"`;
if(aEl) aEl.innerText = `- ${todayQuote.author}`;

let stored = localStorage.getItem('kitabverse_visitors');
let count = stored ? parseInt(stored) : 0;
function formatCounter(n){ if(n <= 999999) return String(n).padStart(6,'0'); return String(n); }
let vEl = document.getElementById('visitorCount');
if(vEl) vEl.innerText = formatCounter(count);
setTimeout(()=>{ localStorage.setItem('kitabverse_visitors', count+1); }, 2000);

function resetVisitors(){
  let p = prompt('Enter Admin Password:');
  if(p !== ADMIN_PASS){ alert('Wrong Password'); return; }
  localStorage.setItem('kitabverse_visitors', 0);
  alert('Reset to 000000 Done'); location.reload();
}

function searchBooks(){
  let q = document.getElementById('bookSearch').value.trim();
  if(!q){ alert('Enter book name'); return; }
  let openLib = `https://openlibrary.org/search?q=${encodeURIComponent(q)}`;
  let google = `https://www.google.com/search?q=${encodeURIComponent(q)}+site:books.google.com`;
  let archive = `https://archive.org/search?query=${encodeURIComponent(q)}`;
  document.getElementById('searchResults').innerHTML = `
  <div style="display:flex; flex-direction:column; gap:8px;">
    <a href="${openLib}" target="_blank" style="color:gold; background:#000; padding:8px; border:1px solid gold; border-radius:6px; text-decoration:none;">📚 Open Library - ${q}</a>
    <a href="${google}" target="_blank" style="color:gold; background:#000; padding:8px; border:1px solid gold; border-radius:6px; text-decoration:none;">📖 Google Books - ${q}</a>
    <a href="${archive}" target="_blank" style="color:gold; background:#000; padding:8px; border:1px solid gold; border-radius:6px; text-decoration:none;">🏛️ Archive.org - ${q}</a>
  </div>`;
}

function adminStep1(){
  let p = document.getElementById('adminPass').value;
  if(p !== ADMIN_PASS){ alert('❌ Wrong Password'); return; }
  generatedOTP = String(Math.floor(100000 + Math.random()*900000));
  localStorage.setItem('kitabverse_otp', generatedOTP);
  localStorage.setItem('kitabverse_otp_time', Date.now());
  document.getElementById('otpBox').style.display='block';
  alert('✅ Step 1 OK - OTP: '+generatedOTP);
}
function sendEmailOTP(){
  let otp = localStorage.getItem('kitabverse_otp') || generatedOTP;
  window.open(`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent('KitabVerse OTP '+otp)}&body=${encodeURIComponent('Your OTP is: '+otp+'\nValid 5 min')}`);
}
function sendWhatsAppOTP(){
  let otp = localStorage.getItem('kitabverse_otp') || generatedOTP;
  window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('KitabVerse OTP: '+otp+' - Valid 5 min')}`);
}
function verifyOTP(){
  let entered = document.getElementById('otpInput').value.trim();
  let real = localStorage.getItem('kitabverse_otp');
  let time = localStorage.getItem('kitabverse_otp_time');
  if(!real){ alert('Generate OTP first'); return; }
  if(Date.now() - time > 300000){ alert('OTP Expired'); return; }
  if(entered === real){
    document.getElementById('adminArea').style.display='block';
    renderAdminQuotes();
    alert('✅ Admin Unlocked');
  } else { alert('❌ Wrong OTP'); }
}
function forgotPassword(){
  generatedOTP = String(Math.floor(100000 + Math.random()*900000));
  localStorage.setItem('kitabverse_otp', generatedOTP);
  localStorage.setItem('kitabverse_otp_time', Date.now());
  document.getElementById('otpBox').style.display='block';
  alert('OTP: '+generatedOTP+' - Click Email/WhatsApp button');
}

function renderAdminQuotes(){
  let list = document.getElementById('adminQuoteList'); if(!list) return;
  let html = '';
  customQuotes.forEach((qt,i)=>{
    html += `<div style="border:1px solid gold; padding:10px; margin:8px 0; border-radius:8px; background:#000;">
    <input id="qt_${i}" value="${qt.text}" style="width:68%; background:#111; color:#fff; border:1px solid gold; padding:6px; border-radius:4px;">
    <input id="qa_${i}" value="${qt.author}" style="width:27%; background:#111; color:gold; border:1px solid gold; padding:6px; border-radius:4px; margin-left:5px;">
    <div style="margin-top:8px;"><button onclick="updateQuote(${i})" style="background:gold; color:#000; border:none; padding:6px 12px; border-radius:5px; font-weight:bold;">💾 Update</button><button onclick="deleteQuote(${i})" style="background:#ff4444; color:#fff; border:none; padding:6px 12px; border-radius:5px; margin-left:5px;">🗑️ Delete</button></div></div>`;
  });
  list.innerHTML = html || '<p style="color:gray;">No custom quotes</p>';
}
function addQuote(){
  let t = document.getElementById('newQuoteText').value.trim();
  let a = document.getElementById('newQuoteAuthor').value.trim() || 'Admin';
  if(!t){ alert('Enter quote'); return; }
  customQuotes.push({text:t, author:a});
  localStorage.setItem('kitabverse_custom_quotes', JSON.stringify(customQuotes));
  document.getElementById('newQuoteText').value=''; document.getElementById('newQuoteAuthor').value='';
  renderAdminQuotes(); alert('✅ Added');
}
function updateQuote(i){
  customQuotes[i].text = document.getElementById(`qt_${i}`).value;
  customQuotes[i].author = document.getElementById(`qa_${i}`).value;
  localStorage.setItem('kitabverse_custom_quotes', JSON.stringify(customQuotes));
  alert('✅ Updated');
}
function deleteQuote(i){
  if(!confirm('Delete?')) return;
  customQuotes.splice(i,1);
  localStorage.setItem('kitabverse_custom_quotes', JSON.stringify(customQuotes));
  renderAdminQuotes(); alert('Deleted');
}
function submitFeedback(){
  let name = document.getElementById('fbName').value.trim();
  let msg = document.getElementById('fbMsg').value.trim();
  if(!name || !msg){ alert('Fill all'); return; }
  alert('Thank you '+name+'! Feedback Received');
  document.getElementById('fbName').value=''; document.getElementById('fbMsg').value='';
}
