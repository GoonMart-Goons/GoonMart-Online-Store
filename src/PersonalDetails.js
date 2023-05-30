import { useState } from 'react';
import './AccountSettings.css';

const ProfilePage=({Fname,Fsurname,Femail})=> {
    const [name, setName] = useState({Fname});
    const [email, setEmail] = useState({Femail});
    const [surname, setSurname] = useState({Fsurname});
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
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
            <h1> Personal Information</h1>
            <hr />
        </div>
            <div className="profile-container">
              
                    <div className="profile-field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={Fname} onChange={handleNameChange} />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="surname">Surname:</label>
                        <input type="surname" id="surname" value={Fsurname} onChange={handleSurnameChange} />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={Femail} onChange={handleEmailChange} />
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