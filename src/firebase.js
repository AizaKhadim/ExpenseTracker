// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// (agar Cloud Messaging ya Storage chahiye to wahan se import karein)

const firebaseConfig = {
  apiKey: "AIzaSyBKd0I4ta82twP3LK624buSd3-V6OvDfFA",
  authDomain: "task-tracker-dev-134f3.firebaseapp.com",
  projectId: "task-tracker-dev-134f3",
  storageBucket: "task-tracker-dev-134f3.firebasestorage.app",
  messagingSenderId: "236222809565",
  appId: "1:236222809565:web:2151ef4af38019e6c12234",
  measurementId: "G-PCWL4C6JJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export commonly used services
export const auth = getAuth(app);
export const db   = getFirestore(app);
