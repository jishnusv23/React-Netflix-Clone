
import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../../FormValidationSchema/signupValidation";
import { login, signup } from "../../../config/firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const ErrorText = ({ children }) => (
  <small style={{ color: "red" }}>{children}</small>
);

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  //user authentication
  const user_auth = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (signState == "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={user_auth}
        >
          <Form>
            {signState === "Sign Up" ? (
              <>
                <Field type="text" name="username" placeholder="Username" />
                <ErrorMessage name="username" component={ErrorText} />
              </>
            ) : (
              <></>
            )}
            <Field type="text" name="email" placeholder="Email" />
            <ErrorMessage name="email" component={ErrorText} />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component={ErrorText} />
            <button type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </Form>
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
      </div>
    </div>
  );
};

export default Login;