import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBWFeVhQgFbo6SMnfcPjy33GG71DBVAc0k",
    authDomain: "react-app-journal-405b2.firebaseapp.com",
    projectId: "react-app-journal-405b2",
    storageBucket: "react-app-journal-405b2.appspot.com",
    messagingSenderId: "164605788591",
    appId: "1:164605788591:web:ff4227c646c6d7cce7af5a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}