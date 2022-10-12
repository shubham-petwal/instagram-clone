import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    fullName : Yup.string().min(1).max(30).required("name field is required"),
    email: Yup.string().email("email should be in correct format").required("email is required"),
    userName: Yup.string().min(4).max(18).required("username is required"),
    password: Yup.string().required("Please enter your password") .matches(
      /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 10 characters, one uppercase, one number and one special case character"
    )
})