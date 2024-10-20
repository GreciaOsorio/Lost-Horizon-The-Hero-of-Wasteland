// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6oiZ9TQ0j_2FgkdV5zp1LjqcNLxFTlPA",
    authDomain: "losthorizonfirebase.firebaseapp.com",
    projectId: "losthorizonfirebase",
    storageBucket: "losthorizonfirebase.appspot.com",
    messagingSenderId: "843338653642",
    appId: "1:843338653642:web:b77732c900de8c4c4af933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { app, db };