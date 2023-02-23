// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWdNj8xzJLJKgDv_jmFATCr8I2FrsDHcc",
  authDomain: "practice-7300.firebaseapp.com",
  projectId: "practice-7300",
  storageBucket: "practice-7300.appspot.com",
  messagingSenderId: "264205630811",
  appId: "1:264205630811:web:5be45f773538aadef36e7e",
  measurementId: "G-LWFLDEKQ3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
