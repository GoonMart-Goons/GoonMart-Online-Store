import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { auth } from './config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth';

const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
  });

export default function Login() {
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const SignIn = (e) => {
        // e.preventDefault()
        if (Object.keys(errors).length === 0){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log("Signed in successfully: ", userCredentials)
                navigate('/InnerHomepage'); // navigate to the HOME page
            }).catch((error) => {
                console.log("Failed to login: ", error)
            })
        }
    }

    // const onSubmit = (data) => {
    //     setUserInfo(data);
    //     console.log(data);
    //     if (Object.keys(errors).length === 0) { // check if errors object is empty
    //         SignIn()
    //         // navigate('/'); // navigate to the HOME page
    //     }
    // }

    const navigate = useNavigate();
    
  return (
    <section>
        <div className="Form">
            <div className="col-1">
                <img src= "/goonmart-logo.png" className='loginLogo'/>
                <h2>Welcome Back!</h2>

                <form id='loginrForm' className='loginForm' onSubmit={handleSubmit(SignIn)}>
                    
                    <label className="form-label" htmlFor = "email">Email</label>
                    <input className="form-input" type="email"  name="email" {...register("email")} placeholder='Email' 
                    onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                    {errors.email && <error className="form-error">{errors.email.message}</error>}

                    <label className="form-label" htmlFor = "password">Password</label>
                    <input className="form-input" type="password" name="password" {...register("password")} placeholder='********' 
                    onChange = {(e) => setPassword(e.target.value)} value = {password}/>
                    {errors.password && <error className="form-error">{errors.password.message}</error>}
                    
                    <button type="submit" className="form-btn">LOGIN</button>
                </form>
                <i>Don't have an account? Register</i><button className="form-link-btn" onClick = {() => navigate('/register')}><i>here</i></button>
            </div>
        </div>
    </section>
  )
}