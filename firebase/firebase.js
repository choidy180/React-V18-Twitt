// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import "firebase/database";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEs0QNV5jsCgiRab0petD9w2vmxzfvUqg",
  authDomain: "reactv18-twitt.firebaseapp.com",
  projectId: "reactv18-twitt",
  storageBucket: "reactv18-twitt.appspot.com",
  messagingSenderId: "561626340132",
  appId: "1:561626340132:web:60acf35236becb2e91f1b1",
  measurementId: "G-BK1F98Q9TE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);

export const dbService = getFirestore();
export const storageService = getStorage();