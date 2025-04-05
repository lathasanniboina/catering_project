
// const auth = firebase.auth();
// const db = firebase.firestore();

// const signupForm = document.getElementById("signup-form");

// signupForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const name = document.getElementById("name").value;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

    
//     await db.collection("users").doc(user.uid).set({
//       name: name,
//       email: email,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     });

//     alert("Signup successful!");
//     window.location.href = "index.html";

//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {
//       alert("Email is already registered. Please login.");
//       window.location.href = "login.html";
//     } else {
//       console.error("Signup error:", error.message);
//       alert("Error: " + error.message);
//     }
//   } 
// });
// const auth = firebase.auth();
// const db = firebase.firestore();

// async function handleSignup(e) {
//   e.preventDefault(); // prevent page reload on form submit

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const name = document.getElementById("name").value;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     await db.collection("users").doc(user.uid).set({
//       name: name,
//       email: email,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     });

//     alert("Signup successful!");
//     window.location.href = "index.html";

//   } catch (error) {
//     if (error.code === "auth/email-already-in-use") {
//       alert("Email is already registered. Please login.");
//       window.location.href = "login.html";
//     } else {
//       console.error("Signup error:", error.message);
//       alert("Error: " + error.message);
//     }
//   }
// }
import { auth, db } from "./firebase-config.js";

document.getElementById("signup-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      name,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Signup successful!");
    window.location.href = "index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email already registered. Please login.");
      window.location.href = "login.html";
    } else {
      console.error("Signup error:", error.message);
      alert("Error: " + error.message);
    }
  }
});
