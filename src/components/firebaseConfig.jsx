import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDOYMp7fhfOpui-uKGlNDchy-YLYD_m1AI",
  authDomain: "studcord-001.firebaseapp.com",
  projectId: "studcord-001",
  storageBucket: "studcord-001.appspot.com",
  messagingSenderId: "741026944682",
  appId: "1:741026944682:web:63b2ab3130c45b7dc1e2d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =  getFirestore(app);
