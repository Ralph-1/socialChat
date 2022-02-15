import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyCMd2ZrsJbhhtanrMuw55a8B0qVvFb11Js",
  authDomain: "socialchat-5a71c.firebaseapp.com",
  projectId: "socialchat-5a71c",
  storageBucket: "socialchat-5a71c.appspot.com",
  messagingSenderId: "240661111929",
  appId: "1:240661111929:web:c79e64c1cb2b29d97520a8",
  measurementId: "G-4VZW8N7VBL"
}).auth();
