import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCbT7DV58OrCbFbxFpYnCY2CPpTfNChm1w",
  authDomain: "notes-app-bba20.firebaseapp.com",
  projectId: "notes-app-bba20",
  storageBucket: "notes-app-bba20.firebasestorage.app",
  messagingSenderId: "379380850976",
  appId: "1:379380850976:web:e826fd421cd1c0693d7745",
  measurementId: "G-W8YX9P8YVL",
}

const validKey =  process.env.REACT_APP_FIREBASE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  return Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      return getToken(messaging, { vapidKey: validKey });
    } else {
      console.log("Permission denied for notifications");
    }
  });
};


export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        resolve(payload);
    });
  });
};
  