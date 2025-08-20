import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAikufUEUGmof5KcP8GMN4NM0YiNsR-JcA",
    authDomain: "web-project-f916d.firebaseapp.com",
    projectId: "web-project-f916d",
    storageBucket: "web-project-f916d.firebasestorage.app",
    messagingSenderId: "808068317511",
    appId: "1:808068317511:web:89e00c654a5d3bff5ccc62",
    measurementId: "G-49RC9W68W1"
  };

  // počáteční nastavení firebase (init)
  const app = initializeApp(firebaseConfig)

  // Export služeb, které chceš používat
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };