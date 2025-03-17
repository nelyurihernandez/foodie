import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Registro de usuario
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return {
      email: user.email,
      firebaseId: user.uid,
    };
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Inicio de sesión
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión: ", error.message);
    throw new Error(error.message);
  }
};

// Cerrar sesión
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const checkAuth = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const getCurrentUserUid = () => {
  return auth.currentUser ? auth.currentUser.uid : null;
};
export const getCurrentUserEmail = () => {
  return auth.currentUser ? auth.currentUser.email : null;
};
