import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDcTO5JaXcs7vC8Okl9oh4cGdUaKemtlM8",
  authDomain: "my-attender.firebaseapp.com",
  databaseURL: "https://my-attender.firebaseio.com",
  projectId: "my-attender",
  storageBucket: "my-attender.appspot.com",
  messagingSenderId: "1033346866286",
  appId: "1:1033346866286:web:f3989d4a48cf63b4555a7f",
  measurementId: "G-QXTLEK6CWD"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase