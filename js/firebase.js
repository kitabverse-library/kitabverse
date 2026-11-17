// Firebase v10 - Secure Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3RtkFn390udz28cGyS0_zGdMmc-YVCu8",
  authDomain: "kitabverse.firebaseapp.com",
  projectId: "kitabverse",
  storageBucket: "kitabverse.firebasestorage.app",
  messagingSenderId: "918701492498",
  appId: "1:918701492498:web:f2bdae6a46b1a2b3edcbcb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
