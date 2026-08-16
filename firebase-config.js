// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQ80wPekkKX3-bY0f4l5YNWOCs72hLQPE",
    authDomain: "smart-transformer-digital-twin.firebaseapp.com",
    databaseURL: "https://smart-transformer-digital-twin-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-transformer-digital-twin",
    storageBucket: "smart-transformer-digital-twin.firebasestorage.app",
    messagingSenderId: "181417968589",
    appId: "1:181417968589:web:8c1ac43ebbfe57a5d5fa84"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };