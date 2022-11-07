const { initializeApp } = require("firebase/app");
const { getFirestore} = require("firebase/firestore");
const firebaseConfig = require('./firebaseConfig');
const {getStorage} = require("firebase/storage");

const app = initializeApp(firebaseConfig.config);
const storage = getStorage(app);
module.exports = storage; 
