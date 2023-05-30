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
import { personalInformation } from './AddressInfo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Get cartItems from Cart.js
import { userCartItems } from './Cart';
//import {u} from './AddressInfo'

// To get logged in user info
import { getUserByEmail, userEmail } from './Login';

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
    /*.matches(
      /^(?=.*\d)*$/,
      "Incorrect password format"
    )*/
    .min(3, "invalid CVV number")
    .max(3, "Invalid CVV number")
    ,
    cardDate: yup.string()
    .required("Card expiration date is required")
    .min(5, "Incorrect date format")
    .max(5, "Incorrect date format"),
    firstName: yup.string()
    .required("First name is required")
    .min(2, "Name must be at least 2 characters long"),
    surname: yup.string()
    .required("Surname is required")
    .min(2, "Name must be at least 2 characters long"),
    address: yup.string()
    .required("Address is required")
    .min(8, "Address must be at least 8 characters long"),
    cityTown: yup.string()
    .required("City/Town is required")
    .min(4, "City/Town must be at least 4 characters long"),
    postalCode: yup.string()
    .required("Postal code is required")
    .min(4, "Postal code is too short")
    .max(4, "Postal code is too long"),

  });

const Checkout = (props) => {

  const location = useLocation();
  console.log(location)
  console.log(props)
  console.log("What you need to see")
  //console.log(u)
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
    const [PromoCode, setPromoCode] = useState()
    const [totalValue, setTotalValue] = useState();

    const finalTotal = 0;

    function recalculateTotal(originalPrice){
      //let t = document.getElementById('textToChange'); 
      let promoCode = document.getElementById("PromoCode").value;
      let discountValue = listOfPromos[promoCode]
      //console.log(discountValue)
      let finalPrice = originalPrice*discountValue;
      return finalPrice
    }

    const listOfPromos = {"MESSI": 0.5, "BURGER_KING": 0.2, "LUBUNTU": 0.7, "": 1}

    const SignIn = (e) => {
        // e.preventDefault()
        
        if (Object.keys(errors).length === 0){
            console.log("Successful payment");
            //console.log(cartDetails);
        }
    }

    const navigate = useNavigate();

    const summary = userCartItems.map(item => {
      return {
        product: item.name,
        quantity: item.quantity,
        price: item.price
      }
    })

    function aggregateSums(){
      let numToDisplay = 0;
      summary.forEach(element => {
        //console.log("this is not working")
        //console.log(element.price)
        numToDisplay += element.price;
      });
      return numToDisplay;
    }

    function displayNewPrice(){
      if(PromoCode!==undefined){
        let numToDisplay = aggregateSums()
        numToDisplay = recalculateTotal(numToDisplay)
        if(!Number.isNaN(numToDisplay)){
          setTotalValue("Discount Price: R" + numToDisplay)
        }
      }
    }
    
  return (
    <section>
      <div>
       <InnerNavigationBar/>
      </div>
        <div className="Form">

            <div className="col-1">
                {/*<img src= "/imgs/goonmart-logo.png" className='loginLogo' alt='goonmart logo'/>*/}
                

                <form id='loginrForm' data-testid="login-form" className='loginForm' onSubmit={handleSubmit(SignIn)}>

                  <h2>Shipping Address</h2>
                  <p>Name: {personalInformation.Name}</p>
                  <p>Address: {personalInformation.Address}</p>
                  <p>City/Town: {personalInformation.Town}</p>
                  <div>
                  <h2>Order Summary</h2>
                  {summary.map((sumz) => (
                    <p key={sumz.id}>
                     {sumz.quantity} x {sumz.product}: R{sumz.price * sumz.quantity}
                    </p>
                  ))}
                </div>
                <div>
                  <label className="form-label" htmlFor = "PromoCode">Promo code: </label>
                  <input id='PromoCode' className="form-input" type="name"  name="PromoCode" {...register("PromoCode")} placeholder='' value = {PromoCode}
                  onChange = {(e) => setPromoCode(e.target.value)} />
                  {errors.PromoCode && <error className="form-error">{errors.PromoCode.message}</error>}
                  
                  <div>
                    <b>Total Price: R{aggregateSums()}</b>
                  </div>
                  <div>
                    <b id='textToChange'>{totalValue}</b>
                  </div>
                  <div>
                    <button className='form-btn' onClick={() => displayNewPrice()}>Use promo code</button>
                  </div>
                </div>
                  <h2>Card Information</h2>

                  <label className="form-label" htmlFor = "cardNum">Card number</label>
                  <input className="form-input" type="name"  name="cardNum" {...register("cardNum")} placeholder='XXXXXXXXXXXXXXXX' value = {cardNum}
                  onChange = {(e) => setCardNum(e.target.value)} />
                  {errors.cardNum && <error className="form-error">{errors.cardNum.message}</error>}

                    <label className="form-label" htmlFor = "cardName">Cardholder Name</label>
                    <input className="form-input" type="name"  name="cardName" {...register("cardName")} placeholder='Danny Fenton' value = {cardName}
                    onChange = {(e) => setCardName(e.target.value)} />
                    {errors.cardName && <error className="form-error">{errors.cardName.message}</error>}
                    
                    <label className="form-label" htmlFor = "cardDate">Expiration date</label>
                    <input className="form-input" type="name"  name="cardDate" {...register("cardDate")} placeholder='MM/YY' value = {cardDate}
                    onChange = {(e) => setCardDate(e.target.value)} />
                    {errors.cardDate && <error className="form-error">{errors.cardDate.message}</error>}

                    <label className="form-label" htmlFor = "CVV">CVV</label>
                    <input className="form-input" type="name"  name="CVV" {...register("CVV")} placeholder='' value = {CVV}
                    onChange = {(e) => setCardCVV(e.target.value)} />
                    {errors.CVV && <error className="form-error">{errors.CVV.message}</error>}
                    <button type="submit" className="form-btn" >Purchase</button>
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