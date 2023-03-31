import React, {useState} from "react";
import {useForm} from "react-hook-form";

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const {register, handleSubmit, errors} = useForm();

    //const handleSubmit = (e) => {
    //    e.preventDefault();
    //    console.log(email);
    //}
    const [userInfo, setUserInfo] = useState();

    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(data);
    }

    return (
        <div className="auth-form-container">
            <pre> {JSON.stringify(userInfo, undefined, 2)}</pre> 
            <h2>Create an account</h2>
            <form className="register-form" onSubmit = {handleSubmit(onSubmit)}>
                <label htmlFor = "name">Name</label>
                <input value = {name} type = "name" placeholder = "Name" id="name" name = "name" onChange={event => setName(event.target.value)} {...register("name")}/>
                <label htmlFor = "surname">Surname</label>
                <input value = {surname} type = "name" placeholder = "Surname" id="surname" name = "surname" onChange={event => setSurname(event.target.value)} {...register("surname")}/>
                <label htmlFor = "email">Email</label>
                <input value = {email} type = "email" placeholder = "youremail@gmail.com" id="email" name = "email" onChange={event => setEmail(event.target.value)} {...register("email")}/>
                <label htmlFor = "password">Password</label>
                <input value = {pass} type = "password" placeholder = "********" id="password" name = "password" onChange={event => setPass(event.target.value)} {...register("password")}/>
                <label htmlFor = "confirmPassword">Confirm Password</label>
                <input value = {confirmPass} type = "password" placeholder = "********" id="confirmPassword" name = "confirmPassword" onChange={event => setConfirmPass(event.target.value)} {...register("confirmPassword")}/>
                
                <button type = "submit">Register</button>
            </form>
            <button className="link-btn" onClick = {() => props.onFormSwitch('login')} >Already have an account? Login here.</button>
        </div>
    )
}