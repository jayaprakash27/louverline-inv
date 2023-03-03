// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAknFVgr3741elfVIVVZDUxyeonJWyfCvg",
  authDomain: "louverline-signin.firebaseapp.com",
  projectId: "louverline-signin",
  storageBucket: "louverline-signin.appspot.com",
  messagingSenderId: "1020376434229",
  appId: "1:1020376434229:web:7e2145fca7a9dafeb4d37c",
  measurementId: "G-V8CTMRDGDN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);