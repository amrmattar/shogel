import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMj1LZ0s4PfZlXcq-DdRWSyxdYHrX9Emg",
  authDomain: "sho8l-96261.firebaseapp.com",
  databaseURL: "https://sho8l-96261-default-rtdb.firebaseio.com",
  projectId: "sho8l-96261",
  storageBucket: "sho8l-96261.appspot.com",
  messagingSenderId: "879215757540",
  appId: "1:879215757540:web:8d79b23a2afd3b87e244f1",
  measurementId: "G-V5294RZD1R",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setFCMToken) => {
  const vapidKey =
    "BE7foxy964hhndsr_YggJEpUrgyynq7UC-JZf8cm_kpSmH6weL9v0evNeBkivgIMUPUxgRsuqR1aGDBAR0m-jmg";

  return getToken(messaging, { vapidKey })
    .then((currentToken) => {
      if (currentToken) return setFCMToken(currentToken);

      setFCMToken("");
      console.log("'Token' not found");
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

export default firebaseApp;
