const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./firebaseCred.json')
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
  storageBucket: 'instagram-clone-44275.appspot.com'
});
const bucket = getStorage().bucket();
module.exports = bucket; 