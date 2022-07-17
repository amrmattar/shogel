import * as yup from 'yup'

const passwordRules = /^(?=.*\d) (?=.*[a-z]) (?=.*[A-Z]).{5,}$/;
const usernameRules = /^[A-Za-z]+$/;
export const basicSchema = yup.object().shape({
    username: yup.string().min(4).max(10).matches(usernameRules, 'Please Enter Username English Lang').required("* Expected Username"),
    email: yup.string().email('Please Enter Username Email').required("* Expected Email"),
    password: yup.string().min(8).matches(passwordRules, "Please Create a Strong Password")
})