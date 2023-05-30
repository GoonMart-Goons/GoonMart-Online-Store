import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/Config';
import React, {useState, useEffect} from 'react';
import PersonalDetails from '../PersonalDetails';


const AccountDetails = ({user}) => {
    const [ProdDetails, setProdDetails] = React.useState([])
    //console.log(user);

    React.useEffect(() => {
        getUserDetails(user)
      }, [])

    async function getUserDetails(user){
        const prodsRef = collection(db, 'Users')
        const q = query(prodsRef, where('email', '==',user));
        const prodSnapshot = await getDocs(q)
        const prodDoc = prodSnapshot.docs[0] 
        //console.log(prodSnapshot.empty);
        //console.log(prodDoc.data());
        //console.log(prodSnapshot.docs.data());

        //const data = prodDoc.data();

        setProdDetails([prodDoc.get('name'), prodDoc.get('surname'),prodDoc.get('email')]);
        //console.log(ProdDetails[2]);
        
    }
    return (
        <div>
            <PersonalDetails
            Fname={ProdDetails[0]}
            Fsurname={ProdDetails[1]}
            Femail={ProdDetails[2]}
            />
        </div>

    );


}
export default AccountDetails;