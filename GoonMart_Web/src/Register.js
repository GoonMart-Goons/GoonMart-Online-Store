import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { auth, db } from './config/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'


const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z]+$/, "Name can only contain alphabetical characters")
      .min(2, "Name must be at least 2 characters long"),
    surname: yup
      .string()
      .required("Surname is required")
      .matches(
        /^[A-Za-z]+$/,
        "Surname can only contain alphabetical characters"
      )
      .min(2, "Surname must be at least 2 characters long"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

export default function Register() {

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
            await createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredentials) => {
              const user = userCredentials.user
              addToDB(data.name, data.surname, data.email)
            })
            
            console.log("Added successfully")
            navigate('/'); // navigate to the HOME page
        }
    }

    //FIXME Not working for some reason
    async function addToDB(name, surname, email){
      const usersRef = doc(db, "Users");
      await setDoc(usersRef, {
        name: name,
        surname: surname,
        email: email
      });
      console.log("User added with ID: ", usersRef.id);
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
                <h2>Create an account</h2>

                <form id='registerForm' className='registerForm' onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-label" htmlFor = "name">Name</label>
                    <input className="form-input" type="name" name="name" {...register("name")} placeholder='Name' 
                    onChange = {(e) => setName(e.target.value)} value = {name}/>
                    {errors.name && <error className="form-error">{errors.name.message}</error>}

                    <label  className="form-label" htmlFor = "surnname">Surame</label>
                    <input className="form-input" type="name" name="surname" {...register("surname")} placeholder='Surname' 
                    onChange = {(e) => setSurname(e.target.value)} value = {surname}/>
                    {errors.surname && <error className="form-error">{errors.surname.message}</error>}

                    <label className="form-label" htmlFor = "email">Email</label>
                    <input className="form-input" type="email"  name="email" {...register("email")} placeholder='Email' 
                    onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                    {errors.email && <error className="form-error">{errors.email.message}</error>}

                    <label className="form-label" htmlFor = "password">Password</label>
                    <input className="form-input" type="password" name="password" {...register("password")} placeholder='********' />
                    {errors.password && <error className="form-error">{errors.password.message}</error>}

                    <label className="form-label" htmlFor = "confirmPassword">Confirm Password</label>
                    <input className="form-input" type="password" name="confirmPassword" {...register("confirmPassword")} placeholder='********' 
                    onChange = {(e) => setPassword(e.target.value)} value = {password}/>
                    {errors.confirmPassword && <error className="form-error">{errors.confirmPassword.message}</error>}
                    
                    <button type="submit" className="form-btn">Register</button>
                </form>
                <button className="form-link-btn" onClick = {() => navigate('/login')} >Already have an account? Login here.</button>
            </div>
        </div>
    </section>
  )
}