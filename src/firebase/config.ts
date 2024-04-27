import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "github-viewer-7e48c.firebaseapp.com",
    projectId: "github-viewer-7e48c",
    storageBucket: "github-viewer-7e48c.appspot.com",
    messagingSenderId: "482924526545",
    appId: "1:482924526545:web:c6ee49343bba65d3babef0"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };