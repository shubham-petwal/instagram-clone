// importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_MESSAGING_APP_ID,
});

// eslint-disable-next-line
const messaging = firebase.messaging();
messaging.onBackgroundMessage((message) => {
  return self.showNotification(
    message.notification.title,
    message.notification
  );
});

const initMessaging = firebase.messaging();


