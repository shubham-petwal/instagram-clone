import firebase from "firebase/compat/app"
import "firebase/compat/auth"
const firebaseConfig = {
    apiKey: "AIzaSyB0VyC346tAfEqFHMAjbr_tkK1W7MgM-Hc",
    authDomain: "instagram-clone-44275.firebaseapp.com",
    projectId: "instagram-clone-44275",
    storageBucket: "instagram-clone-44275.appspot.com",
    messagingSenderId: "891143983058",
    appId: "1:891143983058:web:c053efbd5962a04815020b"
}; 
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()