import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth'

import { createAuth } from '@redwoodjs/auth-firebase-web'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,

  // Optional config, may be needed, depending on how you use firebase
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
}

const firebaseApp = ((config) => {
  const apps = getApps()

  if (!apps.length) {
    initializeApp(config)
  }

  return getApp()
})(firebaseConfig)

export const firebaseClient = {
  firebaseAuth,
  firebaseApp, // optional
}

export const { AuthProvider, useAuth } = createAuth(firebaseClient)

export const signUp = async (email, password) => {
const auth = getAuth(firebaseApp);
try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log('User created successfully');
  firebaseAuth.sendEmailVerification(userCredential.user);
  // userCredential.user.sendEmailVerification().then(()=>{console.log('Email sent')}).catch((error)=>{console.log(error.message)});
  return userCredential.user;
} catch (error) {
  throw new Error(error.message);
}
};

export const signIn = async (email, password) => {
const auth = getAuth(firebaseApp);
try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return {user:userCredential.user, emailVerified:userCredential.user.emailVerified};
} catch (error) {
  throw new Error(error.message);
}
};