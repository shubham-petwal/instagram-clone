import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZactTyFeIulrC57kVEb2srt1gJHYOG7s",
  authDomain: "instagram-clone-34086.firebaseapp.com",
  projectId: "instagram-clone-34086",
  storageBucket: "instagram-clone-34086.appspot.com",
  messagingSenderId: "543122872991",
  appId: "1:543122872991:web:3109e73c9229da2dd5a0aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

