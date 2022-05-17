import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDsucbp56WD3echCUFYqtlal6juGLqjpWY",
    authDomain: "testdatabase-249e7.firebaseapp.com",
    projectId: "testdatabase-249e7",
    storageBucket: "testdatabase-249e7.appspot.com",
    messagingSenderId: "744831125499",
    appId: "1:744831125499:web:6b784c4fe95c5eb5b3ed5e",
    measurementId: "G-CK6Y654BVD"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig).firestore();

db.settings({ timestampsInSnapshots: true });

export { db }