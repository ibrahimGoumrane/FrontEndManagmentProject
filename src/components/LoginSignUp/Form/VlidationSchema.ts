import * as Yup from "yup";

const validationSchemaSignUp = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  age: Yup.number()
    .min(18, "Age must be at least 18")
    .required("Age is required"),
  skills: Yup.array(),
});

const validationSchemaLogin = Yup.object().shape({
  name: Yup.string().required("name is required"),
  password: Yup.string().required("Password is required"),
});

export { validationSchemaSignUp, validationSchemaLogin };
