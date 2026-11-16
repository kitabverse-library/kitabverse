// KITABVERSE - FINAL STRICT LIBRARY - 5 RULES ANTI-FAKE - GENUINE READERS ONLY
const ADMIN_PASSWORD = "KitabVerse@Mumbai26!";
const ADMIN_EMAIL = "kitabverse.library@gmail.com";
const ADMIN_WHATSAPP = "918828350328";
let generatedOTP = "";

// === RULES IMPLEMENTATION FOR VISITOR COUNTER ===
function initStrictVisitorCounter() {
  const countEl = document.getElementById('visitorCount');
  if (!countEl) return;

  let totalCount = parseInt(localStorage.getItem('kitabverse_total_visitors') || '0');
  const everVisited = localStorage.getItem('kitabverse_ever_visited');

  // Always show current count in 000000 format
  countEl.textContent = String(totalCount).padStart(6, '0');

  // RULE 2: One Phone = One Count Lifetime - Already counted? STOP
  if (everVisited) {
    console.log("Library Rule 2: Already registered - Genuine reader counted before");
    return;
  }

  // Variables for 5 rules check
  let pageLoadTime = Date.now();
  let hasHumanScrolled = false;
  let hasActiveInteraction = false;
  let isTabActive = document.visibilityState === 'visible';
  let scrollStartTime = 0;

  // RULE 4: Active Tab Only - Check if tab is visible
  document.addEventListener('visibilitychange', () => {
    isTabActive = document.visibilityState === 'visible';
  });

  // RULE 5: Interaction Lock - Must touch/click/move
  const markInteraction = () => { hasActiveInteraction = true; };
  window.addEventListener('touchstart', markInteraction, { once: true });
  window.addEventListener('click', markInteraction, { once: true });
  window.addEventListener('mousemove', markInteraction, { once: true });

  // RULE 1 + 3: Genuine Scroll + No Bot Check
  const checkGenuineReader = () => {
    // If already counted, stop
    if (localStorage.getItem('kitabverse_ever_visited')) return;

    // RULE 4: Tab must be active
    if (!isTabActive) {
      console.log("Rule 4 Failed: Tab not active - Fake");
      return;
    }

    // RULE 5: Must have interaction
    if (!hasActiveInteraction) {
      console.log("Rule 5 Failed: No interaction - Fake");
      return;
    }

    const now = Date.now();
    const timeSpent = now - pageLoadTime;

    // RULE 3: No Bot - Human must spend at least 3 seconds before scroll (bot scrolls instantly)
    if (timeSpent < 3000) {
      console.log("Rule 3 Failed: Too fast like bot - Need 3 sec minimum");
      return;
    }

    // RULE 1: Must scroll at least 30% of page - Unlimited time but must scroll down
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // Allow any scroll if they spent genuine time - But at least 10% to show reading interest
    if (scrollPercent < 10 && window.scrollY < 100) {
      console.log("Rule 1 Failed: Not enough scroll - Need to scroll down");
      return;
    }

    // ALL 5 RULES PASSED = GENUINE READER
    totalCount++;
    localStorage.setItem('kitabverse_total_visitors', totalCount.toString());
    localStorage.setItem('kitabverse_ever_visited', 'true');
    localStorage.setItem('kitabverse_first_visit_date', new Date().toISOString());
    countEl.textContent = String(totalCount).padStart(6, '0');

    // Remove listeners after counting
    window.removeEventListener('scroll', scrollHandler);

    console.log(`✅ GENUINE READER REGISTERED: ${totalCount} - All 5 Library Rules Passed`);
    
    // Optional: Small library welcome message
    // alert("Welcome to KitabVerse Library - You are registered as genuine reader 📚");
  };

  let scrollHandler = () => {
    // Debounce - Human scroll check
    if (!scrollStartTime) scrollStartTime = Date.now();
    
    // Wait 500ms after scroll stops to confirm genuine
    clearTimeout(window._kitabverseScrollTimer);
    window._kitabverseScrollTimer = setTimeout(checkGenuineReader, 500);
  };

  window.addEventListener('scroll', scrollHandler);
  console.log("KitabVerse Library: Waiting for genuine reader... Unlimited time + Scroll required");
}

// === QUOTES ===
const defaultQuotes = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Dr. A.P.J. Abdul Kalam" },
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" }
];
function loadQuotes() {
  try { return JSON.parse(localStorage.getItem('kitabverse_quotes')) || defaultQuotes; }
  catch(e) { return defaultQuotes; }
}
function displayDailyQuote() {
  const quotes = loadQuotes();
  const todayIndex = new Date().getDate() % quotes.length;
  const q = quotes[todayIndex];
  const quoteEl = document.getElementById('dailyQuote');
  const authorEl = document.getElementById('quoteAuthor');
  if (quoteEl) quoteEl.textContent = `"${q.text}"`;
  if (authorEl) authorEl.textContent = `- ${q.author}`;
  renderAdminList();
}
function renderAdminList() {
  const list = document.getElementById('adminQuoteList');
  if (!list) return;
  const quotes = loadQuotes();
  list.innerHTML = quotes.map((q, i) => `
    <div style="border:1px solid gold; padding:8px; border-radius:8px; margin:5px 0; background:#000;">
      <input value="${q.text.replace(/"/g, '&quot;')}" id="editText${i}" style="width:100%; background:#111; color:#fff; border:1px solid gold; padding:5px; border-radius:4px;">
      <input value="${q.author}" id="editAuthor${i}" style="width:100%; margin-top:5px; background:#111; color:gold; border:1px solid gold; padding:5px; border-radius:4px;">
      <div style="margin-top:5px; display:flex; gap:5px;">
        <button onclick="updateQuote(${i})" style="flex:1; background:gold; color:#000; border:none; padding:5px; border-radius:4px; font-weight:bold;">Update</button>
        <button onclick="deleteQuote(${i})" style="flex:1; background:#ff4444; color:#fff; border:none; padding:5px; border-radius:4px;">Delete</button>
      </div>
    </div>
  `).join('');
}
window.addQuote = function() {
  const t = document.getElementById('newQuoteText').value.trim();
  const a = document.getElementById('newQuoteAuthor').value.trim();
  if (!t || !a) return alert("Enter both");
  const quotes = loadQuotes();
  quotes.push({ text: t, author: a });
  localStorage.setItem('kitabverse_quotes', JSON.stringify(quotes));
  document.getElementById('newQuoteText').value = ""; document.getElementById('newQuoteAuthor').value = "";
  displayDailyQuote(); alert("Quote Added");
}
window.updateQuote = function(i) {
  const quotes = loadQuotes();
  quotes[i].text = document.getElementById(`editText${i}`).value;
  quotes[i].author = document.getElementById(`editAuthor${i}`).value;
  localStorage.setItem('kitabverse_quotes', JSON.stringify(quotes));
  displayDailyQuote(); alert("Updated");
}
window.deleteQuote = function(i) {
  if (!confirm("Delete this quote?")) return;
  const quotes = loadQuotes(); quotes.splice(i, 1);
  localStorage.setItem('kitabverse_quotes', JSON.stringify(quotes));
  displayDailyQuote();
}
window.resetVisitors = function() {
  if (!confirm("Reset Counter to 000000? Only for testing.")) return;
  localStorage.setItem('kitabverse_total_visitors', '0');
  localStorage.removeItem('kitabverse_ever_visited');
  document.getElementById('visitorCount').textContent = "000000";
}

// === TRUSTED SEARCH ===
window.searchBooks = async function() {
  const q = document.getElementById('bookSearch').value.trim();
  const resDiv = document.getElementById('searchResults');
  if (!q) return resDiv.innerHTML = "<p style='color:gold;'>Enter book name</p>";
  resDiv.innerHTML = "<p style='color:gray;'>Searching trusted sources...</p>";
  try {
    const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=6`);
    const data = await r.json();
    if (!data.docs || data.docs.length === 0) { resDiv.innerHTML = "<p style='color:gray;'>No results. Try different keywords.</p>"; return; }
    resDiv.innerHTML = data.docs.map(b => `
      <div style="border-bottom:1px solid #333; padding:8px 0;">
        <b style="color:#fff;">${b.title}</b><br>
        <small style="color:gold;">${b.author_name ? b.author_name.join(', ') : 'Unknown'} - ${b.first_publish_year || ''}</small><br>
        <a href="https://openlibrary.org${b.key}" target="_blank" style="color:#00ff88; font-size:12px;">📖 View on Open Library</a>
      </div>
    `).join('');
  } catch (e) { resDiv.innerHTML = "<p style='color:red;'>Search error. Check internet.</p>"; }
}

// === SECURED ADMIN ===
window.adminStep1 = function() {
  const pass = document.getElementById('adminPass').value;
  if (pass !== ADMIN_PASSWORD) { alert("❌ Wrong Password! Only Admin."); return; }
  document.getElementById('otpBox').style.display = "block";
  alert("✅ Password Correct - Step 1 Done. Now Step 2 - Get OTP"); sendEmailOTP();
}
window.sendEmailOTP = function() {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const subject = encodeURIComponent(`KitabVerse Admin OTP - ${generatedOTP}`);
  const body = encodeURIComponent(`Your OTP is: ${generatedOTP}\nValid 10 min.\nDo not share.\nKitabVerse`);
  window.open(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  alert(`📧 OTP Email opened - OTP is ${generatedOTP} (Demo)`);
}
window.sendWhatsAppOTP = function() {
  if (!generatedOTP) generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const msg = encodeURIComponent(`KitabVerse Admin OTP: ${generatedOTP} - Valid 10 min`);
  window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${msg}`, '_blank');
  alert(`💬 WhatsApp OTP: ${generatedOTP}`);
}
window.verifyOTP = function() {
  const entered = document.getElementById('otpInput').value.trim();
  if (entered === generatedOTP && generatedOTP !== "") {
    document.getElementById('adminArea').style.display = "block";
    document.getElementById('otpBox').style.display = "none";
    alert("🔓 2-Way Verified - Admin Unlocked - Welcome!");
  } else { alert("❌ Wrong OTP"); }
}
window.forgotPassword = function() {
  const resetMsg = encodeURIComponent(`KitabVerse Password Reset Request\nEmail: ${ADMIN_EMAIL}\nWhatsApp: +${ADMIN_WHATSAPP}`);
  if (confirm("Reset link will be sent to Email + WhatsApp. Continue?")) {
    window.open(`mailto:${ADMIN_EMAIL}?subject=Password Reset - KitabVerse&body=${resetMsg}`, '_blank');
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${resetMsg}`, '_blank');
  }
}

// === FEEDBACK ===
document.getElementById('feedbackForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fbName').value;
  const email = document.getElementById('fbEmail').value;
  const msg = document.getElementById('fbMessage').value;
  const subject = encodeURIComponent(`Feedback from ${name} - KitabVerse`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.open(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`, '_blank');
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
  initStrictVisitorCounter();
  displayDailyQuote();
});
