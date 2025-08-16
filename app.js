// --- Consola en pantalla (triple toque para mostrar/ocultar) ---
(function(){
  const box = document.getElementById('debug');
  let taps = 0, timer = null;
  document.body.addEventListener('touchstart', () => {
    taps++; clearTimeout(timer);
    timer = setTimeout(()=>{ if(taps>=3) box.classList.toggle('hidden'); taps=0; }, 350);
  });
  function log(...args){
    const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    box.textContent += "\n" + msg;
    box.scrollTop = box.scrollHeight;
    console._log && console._log(...args);
  }
  console._log = console.log.bind(console);
  console.log = log;
  window.addEventListener('error', e => log("❌ ERROR:", e.message, "@", e.filename+":"+e.lineno));
  window.addEventListener('unhandledrejection', e => log("⚠️ Rechazo:", e.reason));
  console.log("✅ Debug manual listo (triple toque para mostrar)");
})();

// --- Registrar Service Worker con rutas relativas (válido para GitHub Pages) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
      .catch(err => console.log('❌ Error al registrar SW:', err));
  });
} else {
  console.log('⚠️ Este navegador no soporta Service Workers');
}

// Botón de prueba
document.getElementById('btn').addEventListener('click', () => {
  console.log('🖱️ Botón presionado!');
});
