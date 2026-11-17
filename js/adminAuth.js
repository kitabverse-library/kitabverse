// Secure Firebase Admin Auth - KitabVerse
import { auth, onAuthStateChanged, signOut } from './firebase.js';

export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'admin-login.html';
    }
  });
}

export function checkLogin() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = 'admin-dashboard.html';
    }
  });
}

export async function logout() {
  await signOut(auth);
  window.location.href = 'admin-login.html';
}

if (window.location.pathname.includes('admin-dashboard')) {
  requireAuth();
}
if (window.location.pathname.includes('admin-login')) {
  checkLogin();
}
