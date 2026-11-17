// Firebase v10 - Secure Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3RtkFn390udz28cGyS0_zGdMmc-YVCu8",
  authDomain: "kitabverse-1.firebaseapp.com",
  projectId: "kitabverse-1",
  storageBucket: "kitabverse-1.firebasestorage.app",
  messagingSenderId: "1065120120445",
  appId: "1:1065120120445:web:3c4c5e9f1b2c3d4e5f6a7b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
