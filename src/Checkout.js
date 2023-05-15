import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InnerNavigationBar from './InnerNavigationBar';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { auth } from './config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth';

const validationSchema = yup.object().shape({
    cardNumber: yup.string().required("Card number is required").min(16, "Card number needs to be at least 16 digits long")
    .matches(
      /^(?=.*\d).*$/,
      "Incorrect card number format"
    ),
    name: yup.string()
    .required("Cardholder name is required"),
    /*.matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[-'])*$/,
      "Incorrect name format"
    ),*/
    CVV: yup.string()
    .required("CVV is required")
    .min(3, "invalid CVV number")
    .max(3, "Invalid CVV number")
    .matches(
      /^(?=.*\d)*$/,
      "Incorrect password format"
    ),
    /*password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters\n long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Password must contain at least\n 1 uppercase letter, 1 lowercase letter,\n 1 number, and 1 special character"
      ),*/
  });

export default function Checkout() {

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

    const [cardNum, setCardNum] = useState()
    const [cardName, setCardName] = useState()
    const [cardDate, setCardDate] = useState()
    const [cardCVV, setCardCVV] = useState()

    const SignIn = (e) => {
        // e.preventDefault()
        
        if (Object.keys(errors).length === 0){
            /*signInWithEmailAndPassword(auth, cardNum, cardName)
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
                
            })*/
            console.log("Successful payment");
        }
    }

    const navigate = useNavigate();
    
  return (
    <section>
      <div>
       <InnerNavigationBar/>
      </div>
      
        <div className="Form">
        <div>
          <h2>Shipping Address</h2>
          <p>Danny Fenton</p>
          <p>1234 Street Road</p>
          <p>Town, 0000</p>
        </div>
            <div className="col-1">
                {/*<img src= "/imgs/goonmart-logo.png" className='loginLogo' alt='goonmart logo'/>*/}
                <h2>Card Information</h2>

                <form id='loginrForm' data-testid="login-form" className='loginForm' onSubmit={handleSubmit(SignIn)}>
                    
                    <label className="form-label" htmlFor = "card-num">Card number</label>
                    <input className="form-input" type="card-num"  name="card-num" {...register("card-num")} placeholder='XXXXXXXXXXXXXXXX' value = {cardNum}
                    onChange = {(e) => setCardNum(e.target.value)} />
                    {errors.cardNumber && <error className="form-error">{errors.cardNumber.message}</error>}

                    <label className="form-label" htmlFor = "card-name">Cardholder Name</label>
                    <input className="form-input" type="card-name"  name="card-name" {...register("card-name")} placeholder='Danny Fenton' value = {cardName}
                    onChange = {(e) => setCardName(e.target.value)} />
                    {errors.name && <error className="form-error">{errors.name.message}</error>}
                    
                    <label className="form-label" htmlFor = "expir-date">Expiration date</label>
                    <input className="form-input" type="expir-date"  name="expir-date" {...register("expir-date")} placeholder='MM/YY' value = {cardDate}
                    onChange = {(e) => setCardDate(e.target.value)} />
                    {errors.CVV && <error className="form-error">{errors.CVV.message}</error>}

                    <label className="form-label" htmlFor = "cvv">CVV</label>
                    <input className="form-input" type="cvv"  name="cvv" {...register("cvv")} placeholder='' value = {cardCVV}
                    onChange = {(e) => setCardCVV(e.target.value)} />
                    {errors.CVV && <error className="form-error">{errors.CVV.message}</error>}

                    {/*<label className="form-label" htmlFor = "password">Password</label>
                    <label>
                    <input className="form-input" type={showPassword ? "text" : "password"} name="password" {...register("password")} placeholder='********' value = {password}
                    onChange = {(e) => setPassword(e.target.value)} />
                    <i  className="eye-icon" onClick = {togglePasswordVisibility} > {showPassword ? <FaEyeSlash/> : <FaEye/>} </i>
                    </label>
  {errors.password && <error className="form-error">{errors.password.message}</error>}*/}
                    
                    <button type="submit" className="form-btn">Purchase</button>
                </form>
                <div className='chart'>
                  <h2>Order Summary</h2>
                  <p>Item 1: R50.00</p>
                  <p>Item 2: R100.00</p>
                  <b>Total: R150.00</b>
                </div>
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