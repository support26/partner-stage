// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyneKc1qvEzVH5i37EUe48RNPsG6LMfJw",
  authDomain: "android-mapping-backend.firebaseapp.com",
  databaseURL: "https://android-mapping-backend.firebaseio.com",
  projectId: "android-mapping-backend",
  storageBucket: "android-mapping-backend.appspot.com",
  messagingSenderId: "570274094907",
  appId: "1:570274094907:web:d85afb5a80fb55484e211e",
  measurementId: "G-G7PEY0HYVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getDatabase(app);