import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const FirebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBSOd8tuoKqaC9z3Qrmw8zqAm0_HVLYwiw",
  authDomain: "jibber-jabber-3e686.firebaseapp.com",
  projectId: "jibber-jabber-3e686",
  storageBucket: "jibber-jabber-3e686.appspot.com",
  messagingSenderId: "145479449441",
  appId: "1:145479449441:web:c29b4c2498e5618201e320"
})

!firebase.apps.length ? firebase.initializeApp(FirebaseConfig) : firebase.app();

export default FirebaseConfig;
