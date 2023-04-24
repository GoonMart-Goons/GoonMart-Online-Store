import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { auth, db } from './config/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'


const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z]+$/, "Name can only contain alphabetical\n characters")
      .min(2, "Name must be at least 2 characters long"),
    surname: yup
      .string()
      .required("Surname is required")
      .matches(
        /^[A-Za-z]+$/,
        "Surname can only contain alphabetical\n characters"
      )
      .min(2, "Surname must be at least 2 characters\n long"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters\n long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Password must contain at least\n 1 uppercase letter, 1 lowercase letter,\n 1 number, and 1 special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

export default function Register() {

  //Snackbar code
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

  //Eye for passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(showConfirmPassword ? false : true);
  };

    const {
        register, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // const [userInfo, setUserInfo] = useState();

    const onSubmit = async (data) => {
        // setUserInfo(data);
        // console.log(data);
        if (Object.keys(errors).length === 0) { // check if errors object is empty
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredentials) => {
              //const user = userCredentials.user
              console.log(userCredentials)
              addToDB(data.name, data.surname, data.email)
              setOpenSnackbar(true);
                console.log("Added successfully")
                setSnackbarMessage('Registered successfully! Welcome to GoonMart');
                setTimeout(() => {
                  navigate('/InnerHomepage'); // navigate to the HOME page
                }, 2000); //delay for 2 seconds (2000 milliseconds)
            }).catch((error) => {
              console.log("Failed to register: ", error)
              setOpenSnackbar(true);
              setSnackbarMessage('Failed to register: ' + error.message);
              
          })
        }
    }

    //adds user's data to db for lookup purposes
    async function addToDB(name, surname, email){
      addDoc(collection(db, 'Users'), {
        name: name,
        surname: surname,
        email, email
      })
      .then((docRef) => {
        console.log("Doc written with ID: ", docRef.id)
      })
      .catch((error) => {
        console.error("Error adding doc: ", error)
      })
    }

    const navigate = useNavigate();

    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

  return (
    <section>
        <div className="Form">
            <div className="col-1">
                <img src= "/goonmart-logo.png" className='loginLogo' alt='goonmart logo'/>
                <h2>Create an account</h2>

                <form id='registerForm' className='registerForm' onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-label" htmlFor = "name">Name</label>
                    <input className="form-input" type="name" name="name" {...register("name")} placeholder='Name' 
                    onChange = {(e) => setName(e.target.value)} value = {name}/>
                    {errors.name && <error className="form-error">{errors.name.message}</error>}

                    <label  className="form-label" htmlFor = "surnname">Surname</label>
                    <input className="form-input" type="name" name="surname" {...register("surname")} placeholder='Surname' 
                    onChange = {(e) => setSurname(e.target.value)} value = {surname}/>
                    {errors.surname && <error className="form-error">{errors.surname.message}</error>}

                    <label className="form-label" htmlFor = "email">Email</label>
                    <input className="form-input" type="email"  name="email" {...register("email")} placeholder='Email' 
                    onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                    {errors.email && <error className="form-error">{errors.email.message}</error>}

                    <label className="form-label" htmlFor = "password">Password</label>
                    <label>
                    <input className="form-input" type={showPassword ? "text" : "password"} name="password" {...register("password")} placeholder='********' />
                    <i  className="eye-icon" onClick = {togglePasswordVisibility} > {showPassword ? <FaEyeSlash/> : <FaEye/>} </i>
                    </label>
                    {errors.password && <error className="form-error">{errors.password.message}</error>}

                    <label className="form-label" htmlFor = "confirmPassword">Confirm Password</label>
                    <label>
                    <input className="form-input" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" {...register("confirmPassword")} placeholder='********' 
                    onChange = {(e) => setPassword(e.target.value)} value = {password}/>
                    <i  className="eye-icon" onClick = {toggleConfirmPasswordVisibility} > {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>} </i>
                    </label>
                    {errors.confirmPassword && <error className="form-error">{errors.confirmPassword.message}</error>}
                               
                    <button type="submit" className="form-btn">Register</button>
                </form>
                <i>Already have an account? Login</i><button className="form-link-btn" onClick = {() => navigate('/login')}><i>here</i></button>
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