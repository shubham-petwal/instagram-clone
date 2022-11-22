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
  apiKey: "AIzaSyAZactTyFeIulrC57kVEb2srt1gJHYOG7s",
  authDomain: "instagram-clone-34086.firebaseapp.com",
  projectId: "instagram-clone-34086",
  storageBucket: "instagram-clone-34086.appspot.com",
  messagingSenderId: "543122872991",
  appId: "1:543122872991:web:3109e73c9229da2dd5a0aa",
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
