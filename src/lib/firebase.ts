import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDE1oB81AuDOC2uUSUdp0xBz8ETDSNPTdg",
  authDomain: "theonlyteacher.firebaseapp.com",
  projectId: "theonlyteacher",
  storageBucket: "theonlyteacher.firebasestorage.app",
  messagingSenderId: "536964882021",
  appId: "1:536964882021:web:2355a1881242f736bdb08c",
  measurementId: "G-8MVV4D7TPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
