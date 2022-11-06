const dotenv = require('dotenv')
dotenv.config();


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

