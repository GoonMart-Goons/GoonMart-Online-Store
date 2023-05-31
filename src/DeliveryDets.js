import { useState } from 'react';
import './Delivery.css';

const ProfilePage=({Town, Name,Surname, Address, PostalC})=> {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [phone, setPhone] = useState('555-555-5555');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // submit the changes to the user's information to the server
    };

    return (
<div class="container">
  <h1>Delivery Information</h1>
  <hr />
  <div class="form">
    
  <div class="fields fields--2">
    <label class="field">
      <span class="field__label" for="firstname">First name</span>
      <input class="field__input" type="text" id="firstname" value={Name} />
    </label>
    <label class="field">
      <span class="field__label" for="lastname">Last name</span>
      <input class="field__input" type="text" id="lastname" value={Surname} />
    </label>
    <label class="field">
    <span class="field__label" for="address">Address</span>
    <input class="field__input" type="text" id="address" value={Address} />
  </label>
  <label class="field">
    <span class="field__label" for="country">Country</span>
    <select class="field__input" type="text" id="country" value='South Africa'>
      <option value="">South Africa</option>
      <option value="southafrica">South Africa</option>
    </select>
  </label>
  <label class="field">
      <span class="field__label" for="city">City/Town</span>
      <input class="field__input" type="text" id="city" value={Town} />
    </label>
    <label class="field">
      <span class="field__label" for="province">Province</span>
      <select class="field__input" id="province" value='Gauteng'>
        <option value=""></option>
        <option value="Gauteng">Gauteng</option>
      </select>
    </label>
    <label class="field">
      <span class="field__label" for="postal">Postal code</span>
      <input class="field__input" type="text" id="postalcode" value={PostalC} />
    </label>
  </div>
  </div>
</div>
    );
}

export default ProfilePage;
