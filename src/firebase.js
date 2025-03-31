// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIcT96gcTff-73idOYugi1xCURO93eSBA",
  authDomain: "barangay-web.firebaseapp.com",
  projectId: "barangay-web",
  storageBucket: "barangay-web.appspot.com",
  messagingSenderId: "08625309568",
  appId: "1:408625309568:web:37c6e688f5cc56a6bfc365",
  measurementId: "G-G66ELPBFGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const imagesRef = ref(storage, 'images');


export { auth, googleProvider, facebookProvider };
export {storage};
export { db };
