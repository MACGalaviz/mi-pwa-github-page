if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("✅ Service Worker registrado:", reg))
    .catch(err => console.log("❌ Error registrando SW:", err));
}
