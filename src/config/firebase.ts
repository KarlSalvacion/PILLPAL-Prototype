
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALPXkn8EC-dKzGJt4HWomXRtCwldhECVU",
  authDomain: "pillpal-6a123.firebaseapp.com",
  projectId: "pillpal-6a123",
  storageBucket: "pillpal-6a123.firebasestorage.app",
  messagingSenderId: "43146921987",
  appId: "1:43146921987:web:ccf5997e346bee31216636",
  measurementId: "G-9P1LGR59KL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);