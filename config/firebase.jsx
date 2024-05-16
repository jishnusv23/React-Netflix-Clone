import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAj3w8mrgleYmLO99WF3Dsids8gDvqbdfg",
  authDomain: "netflix-clone-65716.firebaseapp.com",
  projectId: "netflix-clone-65716",
  storageBucket: "netflix-clone-65716.appspot.com",
  messagingSenderId: "233588023321",
  appId: "1:233588023321:web:53d627a1f66b0341f3ca88",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//* signup functions

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.id,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

//*export
export { db, auth, signup, login, logout };
