// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✅ Service Worker Registered"))
    .catch(err => console.log("❌ SW Error:", err));
}

// Notification permission
if ('Notification' in window) {
  Notification.requestPermission();
}

let cart = [];

function addToCart(product) {
  cart.push(product);
  alert(product + " added to cart 🛒");
}

// Background Sync
function placeOrder() {
  if (!navigator.onLine) {
    navigator.serviceWorker.ready.then(sw => {
      sw.sync.register('sync-order');
      alert("📡 Order saved! Will sync when online.");
    });
  } else {
    alert("✅ Order placed successfully!");
  }
}