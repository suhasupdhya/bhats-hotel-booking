import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAUhiqBXAvVaYWH5OYGB9SI55zPGmsqBZM",
    authDomain: "bhats-hotel.firebaseapp.com",
    projectId: "bhats-hotel",
    storageBucket: "bhats-hotel.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
