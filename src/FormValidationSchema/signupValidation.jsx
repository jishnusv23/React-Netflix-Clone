import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/^\S*$/, "Username must not contain spaces"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
      "Invalid email format, please use abcd@gmail.com format"
    )
    .required("Email is required")
    .matches(/^\S*$/, "Email must not contain spaces"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/^\S*$/, "Password must not contain spaces"),
  
});
