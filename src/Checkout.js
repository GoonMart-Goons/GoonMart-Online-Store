import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InnerNavigationBar from './InnerNavigationBar';
import { useLocation } from 'react-router-dom';
//import Summary from './Summary';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { auth } from './config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth';

const validationSchema = yup.object().shape({
    cardNum: yup.string()
    .required("Card number is required")
    .matches(
      /^(?=.*\d).*$/,
      "Incorrect card number format"
    )
    .min(16, "Card number needs to be at least 16 digits long"),
    
    cardName: yup.string()
    .required("Cardholder name is required")
    .min(2, "Name must be at least 2 characters long"),
    /*.matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[-'])*$/,
      "Incorrect name format"
    ),*/
    CVV: yup.string()
    .required("CVV is required")
    .matches(
      /^(?=.*\d)*$/,
      "Incorrect password format"
    )
    .min(3, "invalid CVV number")
    .max(3, "Invalid CVV number")
    ,
    cardDate: yup.string()
    .required("Card expiration date is required")
    .min(5, "Incorrect date format")
    .max(5, "Incorrect date format")
  });

const Checkout =(props) => {

  const location = useLocation();
  console.log(location)
  console.log(props)
  //const { cartDetails, total } = location.state;
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
    const [CVV, setCardCVV] = useState()

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
            //console.log(cartDetails);
        }
    }

    const navigate = useNavigate();

    const summary = [{product: "Phone", price: "R5", id: 1},
    {product: "Laptop", price: "R10", id: 2}]

    /*ReactDOM.render(
      <React.StrictMode>
        <Summary/>
      </React.StrictMode>,
      document.getElementById('root')
    );*/

  /*const location = useLocation();
  const { cartDetails, total } = location.state;*/
  
    
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
                    
                    <label className="form-label" htmlFor = "cardNum">Card number</label>
                    <input className="form-input" type="name"  name="cardNum" {...register("cardNum")} placeholder='XXXXXXXXXXXXXXXX' value = {cardNum}
                    onChange = {(e) => setCardNum(e.target.value)} />
                    {errors.cardNum && <error className="form-error">{errors.cardNum.message}</error>}

                    <label className="form-label" htmlFor = "cardName">Cardholder Name</label>
                    <input className="form-input" type="name"  name="cardName" {...register("cardName")} placeholder='Danny Fenton' value = {cardName}
                    onChange = {(e) => setCardName(e.target.value)} />
                    {errors.cardName && <error className="form-error">{errors.cardName.message}</error>}
                    
                    <label className="form-label" htmlFor = "cardDate">Expiration date</label>
                    <input className="form-input" type="name"  name="cardDate" {...register("carDate")} placeholder='MM/YY' value = {cardDate}
                    onChange = {(e) => setCardDate(e.target.value)} />
                    {errors.cardDate && <error className="form-error">{errors.cardDate.message}</error>}

                    <label className="form-label" htmlFor = "CVV">CVV</label>
                    <input className="form-input" type="name"  name="CVV" {...register("CVV")} placeholder='' value = {CVV}
                    onChange = {(e) => setCardCVV(e.target.value)} />
                    {errors.CVV && <error className="form-error">{errors.CVV.message}</error>}

                    <div>
                      <h2>Order Summary</h2>
                      {summary.map((sumz) => (
                        <p key={sumz.id}>
                          {sumz.product}: {sumz.price}
                        </p>
                      ))}
                    </div>
                    <button type="submit" className="form-btn">Purchase</button>
                </form>
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
  );
};
export default Checkout;