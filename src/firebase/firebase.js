import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  getRedirectResult,
} from "firebase/auth";

import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBVDakHybfMz8g0aQVds-5LfYcJpn9psBM",
    authDomain: "todoapp-bcc3e.firebaseapp.com",
    databaseURL: "https://todoapp-bcc3e-default-rtdb.firebaseio.com",
    projectId: "todoapp-bcc3e",
    storageBucket: "todoapp-bcc3e.appspot.com",
    messagingSenderId: "1088157696976",
    appId: "1:1088157696976:web:f2913b0e3d51cc81f4afd5",
    measurementId: "G-B8GP0823WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase realtime DB
export const db = getDatabase(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
auth.useDeviceLanguage()
export const storage = getStorage(app)

// export const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider()
//   provider.setCustomParameters({ prompt: 'select_account' })

//   return signInWithRedirect(auth, provider)
// }

// export const logOut = () => signOut(auth)
// export const verifyEmail = async () => { return sendEmailVerification(auth.currentUser) }

// export const changeEmail = async (password, newEmail) => {
//   return reauthenticate(password).then(() => updateEmail(auth.currentUser, newEmail))
// }

// export const changePassword = async (password, newPassword) => {
//   return reauthenticate(password).then(() => updatePassword(auth.currentUser, newPassword))
// }

// export const reauthenticate = async (password) => {
//   const providerId = auth.currentUser.providerData[0].providerId;

//   if (providerId === 'password') {
//     return emailReauthentication(auth.currentUser, password)
//   } else {
//     // TODO: Implementar para otros providers
//   }
// }

// export const recoverPassword = async email => {
//   return sendPasswordResetEmail(auth, email)
// }

// const emailReauthentication = async (user, password) => {
//   const provider = new EmailAuthProvider()
//   const credential = EmailAuthProvider.credential(user.email, password);

//   try {
//     return reauthenticateWithCredential(user, credential)

//   } catch (error) {
//     throw error;
//   }
// }

export default app;