// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "netflixgpt-fe688.firebaseapp.com",
  projectId: "netflixgpt-fe688",
  storageBucket: "netflixgpt-fe688.firebasestorage.app",
  messagingSenderId: "553690690206",
  appId: "1:553690690206:web:dc14d420b98aa4092f818f",
  measurementId: "G-TM9098BK4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();