self.addEventListener("push", (event) => {
  let data = {};
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    console.error("Push event data parse error:", e);
  }

  console.log("[Service Worker] Push received:", data);

  const title = data.title || "Push Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
