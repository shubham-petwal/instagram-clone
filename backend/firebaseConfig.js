const dotenv = require('dotenv')
dotenv.config();

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_MESSAGING_APP_ID
// };

module.exports = {
    port : process.env.PORT,
    host : process.env.HOST,
    url : process.env.HOST_URL,
    config : {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId:process.env.MESSAGING_SENDER_ID,
        appId: process.env.MESSAGING_APP_ID
    }
}

