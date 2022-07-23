// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDKCK7u6Aj2-mQWZGYSdSMJvACZgAkBPw",
  authDomain: "wordle-clone-9e05c.firebaseapp.com",
  projectId: "wordle-clone-9e05c",
  storageBucket: "wordle-clone-9e05c.appspot.com",
  messagingSenderId: "437128167414",
  appId: "1:437128167414:web:bdf351adb908c9517c51d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const wordBank = getStorage();
export { wordBank };
