import { useState } from 'react';
import './ProfilePage.css';

function ProfilePage() {
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
        <><div className="Header">
            <h1> My Profile</h1>
            <label className="logOut"> Log Out </label>
        </div>
            <div className="profile-container">
              
                    <div className="profile-picture">
                        <img src="https://placehold.it/150x150" alt="Profile" className="Profile-Pic" />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} />
                    </div>
                <div className="profile-field">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>

                <div className="profile-field">
                    <button type="submit" className="btnSub">Save Changes</button>
                </div>
               
                
            </div></>
    );
}

export default ProfilePage;
