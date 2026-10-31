const V='wave-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
addEventListener('fetch',e=>{
  if(e.request.method!='GET'||!e.request.url.startsWith('http'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
