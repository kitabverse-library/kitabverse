// STEP 1 - DAILY QUOTE - ONE QUOTE A DAY - MINIMUM ONE DAY
const quotes = [
{q:"The more that you read, the more things you will know.",a:"Dr. A.P.J. Abdul Kalam"},
{q:"You become what you read.",a:"Rabindranath Tagore"},
{q:"Live as if you were to die tomorrow. Learn as if you were to live forever.",a:"Mahatma Gandhi"},
{q:"Absorb what is useful, discard what is not, add what is uniquely your own.",a:"Bruce Lee"},
{q:"Knowing is not enough, we must apply. Willing is not enough, we must do.",a:"Bruce Lee"},
{q:"Be the change that you wish to see in the world.",a:"Mahatma Gandhi"},
{q:"Books are a uniquely portable magic.",a:"Stephen King"},
{q:"A room without books is like a body without a soul.",a:"Marcus Tullius Cicero"}
];

function loadDailyQuote(){
let today = new Date().toDateString();
let savedDate = localStorage.getItem('quoteDate');
let savedQuote = localStorage.getItem('quoteData');
if(savedDate === today && savedQuote){
try{
let q = JSON.parse(savedQuote);
document.getElementById('dailyQuote').innerText = '"' + q.q + '"';
document.getElementById('quoteAuthor').innerText = '- ' + q.a;
return;
}catch(e){}
}
let index = new Date().getDate() % quotes.length;
let q = quotes[index];
let dq = document.getElementById('dailyQuote');
let qa = document.getElementById('quoteAuthor');
if(dq) dq.innerText = '"' + q.q + '"';
if(qa) qa.innerText = '- ' + q.a;
localStorage.setItem('quoteDate', today);
localStorage.setItem('quoteData', JSON.stringify(q));
}
document.addEventListener('DOMContentLoaded', loadDailyQuote);

// FEEDBACK FORM - LINKED TO EMAIL kitabverse.library@gmail.com
document.addEventListener('DOMContentLoaded', function(){
let form = document.getElementById('feedbackForm');
if(form){
form.addEventListener('submit', function(e){
e.preventDefault();
let name = document.getElementById('fbName').value;
let email = document.getElementById('fbEmail').value;
let message = document.getElementById('fbMessage').value;
let subject = 'KitabVerse Feedback from ' + name;
let body = 'Name: ' + name + '%0D%0AEmail: ' + email + '%0D%0AMessage: ' + message;
window.location.href = 'mailto:kitabverse.library@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
alert('Thank you! Your feedback will be sent to kitabverse.library@gmail.com via your email app.');
});
}
});
