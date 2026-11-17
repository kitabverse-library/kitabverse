// KitabVerse - ULTRA SECURE Admin Auth - Production Grade
// No password in GitHub - Password lives in Firebase Console only
// Public repo safe - Even if hacker sees code, can't login without Firebase credentials

const ADMIN_EMAIL = "kitabverse.library@gmail.com"; // Only this email allowed

function adminLogin() {
  const email = document.getElementById("adminEmail").value.trim();
  const pass = document.getElementById("adminPass").value.trim();
  const err = document.getElementById("err");
  
  if(!email || !pass) {
    err.textContent = "Enter email & password!";
    err.style.display = "block";
    return;
  }

  // Firebase Auth - Secure - Google handles password check
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // LAYER 2: Only allow specific admin email
      if (user.email !== ADMIN_EMAIL) {
        firebase.auth().signOut();
        err.textContent = "⛔ Access Denied: Not an admin!";
        err.style.display = "block";
        return;
      }
      
      // LAYER 3: Optional - Require email verification for extra security
      // if (!user.emailVerified) {
      //   err.textContent = "Verify email first!";
      //   err.style.display = "block";
      //   return;
      // }

      // SUCCESS - Save session
      localStorage.setItem("kitabverse_admin", "true");
      localStorage.setItem("kitabverse_admin_uid", user.uid);
      localStorage.setItem("kitabverse_admin_email", user.email);
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      console.error(error);
      err.textContent = "❌ Invalid email or password!";
      err.style.display = "block";
      setTimeout(() => err.style.display = "none", 4000);
    });
}

function adminLogout() {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("kitabverse_admin");
    localStorage.removeItem("kitabverse_admin_uid");
    localStorage.removeItem("kitabverse_admin_email");
    window.location.href = "admin-login.html";
  });
}

function checkAdmin() {
  // Protect dashboard - If not logged in, redirect
  firebase.auth().onAuthStateChanged((user) => {
    const isAdminFlag = localStorage.getItem("kitabverse_admin") === "true";
    if (!user || user.email !== ADMIN_EMAIL || !isAdminFlag) {
      window.location.href = "admin-login.html";
    }
  });
}
