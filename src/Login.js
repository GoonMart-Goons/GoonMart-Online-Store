import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { auth, db } from './config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters\n long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Password must contain at least\n 1 uppercase letter, 1 lowercase letter,\n 1 number, and 1 special character"
      ),
  });

export let loggedInUserID

export default function Login() {

    //Snackbar code
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

     //Eye for passwords
     const [showPassword, setShowPassword] = useState(false);

     const togglePasswordVisibility = () => {
       setShowPassword(showPassword ? false : true);
     };
     
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [email, setEmail] = useState()

    useEffect(() => {
      if(email) {
        getUserIdByEmail(email)
          .then(() => {
            if(loggedInUserID){
              console.log("User ID:", loggedInUserID)
            } else {
              console.log("User not found")
            }
          })
          .catch(error => {
            console.log("Error:", error)
          })
      }
    }, [email])

    async function getUserIdByEmail(email){
      try{
        const usersRef = collection(db, "Users")
        const qSnapshot = await getDocs(query(usersRef, where("email", "==", email)))
        if(qSnapshot.empty){
          loggedInUserID = null
          return
        }
        loggedInUserID = qSnapshot.docs[0].id
        console.log("User ID:", loggedInUserID)
      } catch(error){
        console.log("Error trying to get User ID:", error)
        loggedInUserID = null
      }
    } 

    const [password, setPassword] = useState()

    const SignIn = (e) => {
        // e.preventDefault()
        
        if (Object.keys(errors).length === 0){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                //console.log("Signed in successfully: ", userCredentials);
                setOpenSnackbar(true);
                setSnackbarMessage('Signed in successfully');
                setTimeout(() => {
                    navigate('/InnerHomepage'); // navigate to the HOME page
                }, 2000); //delay for 2 seconds (2000 milliseconds)
            }).catch((error) => {
                //console.log("Failed to login: ", error)
                setOpenSnackbar(true);
                setSnackbarMessage('Failed to login: ' + error.message);
                
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
                <img src= "/imgs/goonmart-logo.png" className='loginLogo' alt='goonmart logo'/>
                <h2>Welcome Back!</h2>

                <form id='loginrForm' data-testid="login-form" className='loginForm' onSubmit={handleSubmit(SignIn)}>
                    
                    <label className="form-label" htmlFor = "email">Email</label>
                    <input className="form-input" type="email"  name="email" {...register("email")} placeholder='Email' value = {email}
                    onChange = {(e) => setEmail(e.target.value)} />
                    {errors.email && <error className="form-error">{errors.email.message}</error>}

                    <label className="form-label" htmlFor = "password">Password</label>
                    <label>
                    <input className="form-input" type={showPassword ? "text" : "password"} name="password" {...register("password")} placeholder='********' value = {password}
                    onChange = {(e) => setPassword(e.target.value)} />
                    <i  className="eye-icon" onClick = {togglePasswordVisibility} > {showPassword ? <FaEyeSlash/> : <FaEye/>} </i>
                    </label>
                    {errors.password && <error className="form-error">{errors.password.message}</error>}
                    
                    <button type="submit" className="form-btn">LOGIN</button>
                </form>
                <i>Don't have an account? Register</i><button className="form-link-btn" onClick = {() => navigate('/register')}><i>here</i></button>
            </div>
            
        </div>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.startsWith('Failed') ? 'error' : 'success'}
        >
          {snackbarMessage}
        </MuiAlert>
    </Snackbar> 
        
    </section>
  )
}