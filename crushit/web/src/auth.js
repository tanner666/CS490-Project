import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth'

import { createAuth } from '@redwoodjs/auth-firebase-web';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // Optional config, may be needed, depending on how you use Firebase
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = ((config) => {
  const apps = getApps();

  if (!apps.length) {
    initializeApp(config);
  }

  return getApp();
})(firebaseConfig);

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
  return userCredential.user
} catch (error) {
  throw new Error(error.message);
}
};

export const signOutUser = async () => {
  const auth = getAuth(firebaseApp);
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const forgotPassword = async (email) => {  
  const auth = getAuth(firebaseApp);
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getUserUid = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in; you can now access their information.
        const uid = user.uid;
        resolve(uid);
      } else {
        // User is signed out or not authenticated.
        reject(new Error('User is not authenticated'));
      }
      // Unsubscribe from the observer to prevent memory leaks.
      unsubscribe();
    });
  });
};

export const changeUserPassword = async(email, oldPassword, newPassword) => {
  const auth = getAuth(firebaseApp);
  const credential = await firebaseAuth.EmailAuthProvider.credential(email, oldPassword)
  firebaseAuth.reauthenticateWithCredential(auth.currentUser, credential)
  .then(() => {
    // Re-authentication succeeded; proceed to change the password
    firebaseAuth.updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log("Password updated successfully.");
      })
      .catch((error) => {
        console.error("Password update error:", error);
      });
  })
  .catch((error) => {
    console.error("Re-authentication error:", error);
  });}