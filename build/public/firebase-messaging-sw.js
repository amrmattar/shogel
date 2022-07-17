importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDbHu24IGH8cwmOvy4h8F4V80_8LuCTU44",
    authDomain: "shogol-337215.firebaseapp.com",
    projectId: "shogol-337215",
    storageBucket: "shogol-337215.appspot.com",
    messagingSenderId: "434924677036",
    appId: "1:434924677036:web:294ad6a6100b303369fc09",
    measurementId: "G-JR39D1SZ82"
};
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    // console.log('recei background message' , payload)
})