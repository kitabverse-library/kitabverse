self.addEventListener('install', e=>{
  e.waitUntil(caches.open('kv-v1').then(c=>c.addAll(['../index.html','../css/style.css','./app.js','../assets/logo.png'])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
