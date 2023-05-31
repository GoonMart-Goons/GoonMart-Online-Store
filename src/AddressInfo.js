import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InnerNavigationBar from './InnerNavigationBar';
import { useLocation } from 'react-router-dom';
import { db } from './config/Config';
import { doc, setDoc } from 'firebase/firestore';
//import Summary from './Summary';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Get cartItems from Cart.js
import { userCartItems } from './Cart';

// To get logged in user info
import { loggedInUserID } from './Login';

//Firebase imports
import { db } from './config/Config';
import { collection, addDoc } from 'firebase/firestore';

export let personalInformation = {}

const validationSchema = yup.object().shape({
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

//Add addy to FireStore
async function postAddressToDB(personalInfo){
  try {
    const addressDocRef = doc(db, `Users/${loggedInUserID}/Address`, `${loggedInUserID}Address`)
    await setDoc(addressDocRef, personalInfo)
    console.log("Address info added successfully.")
  } catch(error) {
    console.error("Error while posting address to database:", error)
  }
}

const AddressInfo = (props) => {
  const location = useLocation();
  console.log(location)
  console.log(props)
  console.log("Need to see from Address Info")
  console.log(userCartItems)
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
    
    const [firstName, setFirstName] = useState()
    const [surname, setSurname] = useState()
    const [address, setAddress] = useState()
    const [cityTown, setCityTown] = useState()
    const [postalCode, setPostalCode] = useState()

    const personalInfo = {Name: firstName + " " + surname, Address: address, Town: cityTown, PostalCode: postalCode}
    personalInformation = personalInfo
    postAddressToDB(personalInfo)

    const SignIn = (e) => {
        // e.preventDefault()
        
        if (Object.keys(errors).length === 0){
            navigate('/checkout')
            console.log("Successful payment");
            //console.log(cartDetails);
        }
    }

    const navigate = useNavigate();
    
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
                  <label className="form-label" htmlFor = "firstName">First Name</label>
                  <input className="form-input" type="name"  name="firstName" {...register("firstName")} placeholder='Danny' value = {firstName}
                  onChange = {(e) => setFirstName(e.target.value)} />
                  {errors.firstName && <error className="form-error">{errors.firstName.message}</error>}

                  <label className="form-label" htmlFor = "surname">Surname</label>
                  <input className="form-input" type="name"  name="surname" {...register("surname")} placeholder='Fenton' value = {surname}
                  onChange = {(e) => setSurname(e.target.value)} />
                  {errors.surname && <error className="form-error">{errors.surname.message}</error>}

                  <label className="form-label" htmlFor = "address">Address</label>
                  <input className="form-input" type="name"  name="address" {...register("address")} placeholder='89 Somewhere Street' value = {address}
                  onChange = {(e) => setAddress(e.target.value)} />
                  {errors.address && <error className="form-error">{errors.address.message}</error>}

                  <label className="form-label" htmlFor = "cityTown">City/Town</label>
                  <input className="form-input" type="name"  name="cityTown" {...register("cityTown")} placeholder='Johannesburg' value = {cityTown}
                  onChange = {(e) => setCityTown(e.target.value)} />
                  {errors.cityTown && <error className="form-error">{errors.cityTown.message}</error>}

                  <label className="form-label" htmlFor = "postalCode">Postal Code</label>
                  <input className="form-input" type="name"  name="postalCode" {...register("postalCode")} placeholder='3425' value = {postalCode}
                  onChange = {(e) => setPostalCode(e.target.value)} />
                  {errors.postalCode && <error className="form-error">{errors.postalCode.message}</error>}
                  {/*}<Link to={{
                    pathname: '/checkout',
                    state: {userCartItems}
                  }} className="checkout-btn">
                    Proceed to Checkout
                </Link>*/}
                <button type="submit" className="form-btn" >Purchase</button>
                {/*<button type="submit" className="form-btn" >Enter purchase information</button>*/}
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
export default AddressInfo;
