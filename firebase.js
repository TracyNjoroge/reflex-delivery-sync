// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwtJj_eRuROtBoLdek-TLxLqRC4lOc3cM",
  authDomain: "reflex-779d1.firebaseapp.com",
  databaseURL: "https://reflex-779d1-default-rtdb.firebaseio.com",
  projectId: "reflex-779d1",
  storageBucket: "reflex-779d1.firebasestorage.app",
  messagingSenderId: "863266679437",
  appId: "1:863266679437:web:48ae4e8889632a7391d0c4",
  measurementId: "G-QRW0KBDJR6"
  export { app };
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);