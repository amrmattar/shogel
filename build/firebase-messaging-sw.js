importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

const config = {
  apiKey: "AIzaSyAMj1LZ0s4PfZlXcq-DdRWSyxdYHrX9Emg",
  authDomain: "sho8l-96261.firebaseapp.com",
  databaseURL: "https://sho8l-96261-default-rtdb.firebaseio.com",
  projectId: "sho8l-96261",
  storageBucket: "sho8l-96261.appspot.com",
  messagingSenderId: "879215757540",
  appId: "1:879215757540:web:8d79b23a2afd3b87e244f1",
  measurementId: "G-V5294RZD1R",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOption = {
    body: payload.notification.body,
  };

  self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOption
  );
});
