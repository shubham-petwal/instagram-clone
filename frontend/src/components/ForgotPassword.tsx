import React,{useRef} from 'react'
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseSetup"

function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement | null>(null)
    async function handleFormSubmit(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        try{
            if(!emailRef.current){
                throw new Error("ref is not assigned to the email input field")
            }
            else{
                const response = await auth.sendPasswordResetEmail(emailRef.current?.value)
                alert("Reset Password link is sent to your email")
            }   
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="forgotPasswordWrapper">
        <form onSubmit={handleFormSubmit}>
            <input ref={emailRef} type="email" required />
            <button type="submit">Send Reset Email</button>
        </form>
    </div>
  )
}

export default ForgotPassword