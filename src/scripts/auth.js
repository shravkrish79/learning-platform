// Node modules
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";


// Project files
import { auth } from "./firebaseSetup";


// Methods
// if correct, it returns the UID
export async function createAccount(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    result = { status: true, payload: data.user.uid, message: "Created!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

// if correct, it returns the UID
export async function login(email, password) {
  let result = { status: false, payload: "", message: "" };

  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    result = { status: true, payload: data.user.uid, message: "Logged in!" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}

// if correct, it sents an email to reset password
export async function recoverAccount(email) {
  let result = { status: false, payload: "", message: "" };

  try {
    await sendPasswordResetEmail(auth, email);

    result = { status: true, payload: "", message: "Link sent" };
  } catch (error) {
    result.message = error.code;
  }

  return result;
}


export async function disableAccount(uid){
  let result = { status: false, payload: "", message: "" };
  try{
    await auth.updateUser(uid,{disabled: true});
    result = { status: true, payload: "", message: "account disabled" };
  }
  catch (error) {console.log(error);
    result.message = error.code;
}
return result;
}