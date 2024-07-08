// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxFgu83zuUD8T4xXxLzgwdIz1ucZnNFP8",
  authDomain: "shopco-2cc28.firebaseapp.com",
  projectId: "shopco-2cc28",
  storageBucket: "shopco-2cc28.appspot.com",
  messagingSenderId: "972845340865",
  appId: "1:972845340865:web:847b30e9f731f8571f1c40",
  measurementId: "G-RXHHLTKP44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

