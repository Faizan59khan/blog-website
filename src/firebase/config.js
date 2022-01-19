import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDCSAdq_rXHOHjMEz6V2Nm1_pA_ULg29D8",
    authDomain: "blog-website-6e7c9.firebaseapp.com",
    projectId: "blog-website-6e7c9",
    storageBucket: "blog-website-6e7c9.appspot.com",
    messagingSenderId: "875641206853",
    appId: "1:875641206853:web:a293533ec8616695890b2c"
  };


// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }