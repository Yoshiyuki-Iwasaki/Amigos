import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   // REACT_APP_FIREBASE_DATABASE_URL,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
//   REACT_APP_FIREBASE_MEASUREMENT_ID,
// } = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyAAZpUj4snhYi_10zmvum-9EVDdHu0jsyA",
  authDomain: "amigos-744c8.firebaseapp.com",
  databaseURL: "https://amigos-744c8-default-rtdb.firebaseio.com",
  projectId: "amigos-744c8",
  storageBucket: "amigos-744c8.appspot.com",
  messagingSenderId: "1062653024190",
  appId: "1:1062653024190:web:943c9029bb14321bab8bef",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
