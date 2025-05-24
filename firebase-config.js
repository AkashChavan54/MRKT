// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKz9KqJrgj1mAqppHS0WJuw-NEvZNRiDQ",
  authDomain: "mrkt-5df0f.firebaseapp.com",
  databaseURL: "https://mrkt-5df0f-default-rtdb.firebaseio.com",
  projectId: "mrkt-5df0f",
  storageBucket: "mrkt-5df0f.firebasestorage.app",
  messagingSenderId: "300643131220",
  appId: "1:300643131220:web:0a15c46b46009e4d6472c1",
  measurementId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);