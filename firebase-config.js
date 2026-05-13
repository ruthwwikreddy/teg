import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9ON9fnJM38ua-F73ZDfqbHyyRbJzj74Q",
    authDomain: "theeducationgroup-teg.firebaseapp.com",
    projectId: "theeducationgroup-teg",
    storageBucket: "theeducationgroup-teg.firebasestorage.app",
    messagingSenderId: "950244679447",
    appId: "1:950244679447:web:74034128ed41211097a152",
    measurementId: "G-TJJS84ZD43"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, orderBy, serverTimestamp };
