import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "../../FormValidationSchema/signupValidation"; // Ensure to import both schemas
import { login, signup, googleAuthProvider } from "../../../config/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { toast } from "react-toastify";

const ErrorText = ({ children }) => (
  <small style={{ color: "red" }}>{children}</small>
);
const Login = () => {
  // console.log(process.env.REACT_APP_KEY);

  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const user_auth = async (values, { setSubmitting }) => {
    console.log("Reached ", values);
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(values.email, values.password);
      } else {
        await signup(values.username, values.email, values.password);
        toast.success("Signed up successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleSignWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      toast.success("User signed in with Google successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={
            signState === "Sign In"
              ? signInValidationSchema
              : signUpValidationSchema
          }
          onSubmit={user_auth}
        >
          {({ isSubmitting }) => (
            <Form>
              {signState === "Sign Up" && (
                <>
                  <Field type="text" name="username" placeholder="Username" />
                  <ErrorMessage name="username" component={ErrorText} />
                </>
              )}
              <Field type="text" name="email" placeholder="Email" />
              <ErrorMessage name="email" component={ErrorText} />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component={ErrorText} />
              {signState === "Sign Up" && (
                <>
                  <Field
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="cpassword" component={ErrorText} />
                </>
              )}
              <button type="submit" disabled={isSubmitting}>
                {signState}
              </button>
              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" />
                  <label>Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </Form>
          )}
        </Formik>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now </span>
            </p>
          ) : (
            <p>
              Already Have Account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now </span>
            </p>
          )}
        </div>
        <button onClick={handleSignWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
