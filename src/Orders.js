import React, {useState} from 'react';
import './Reviews.css';
import OrdersNavBar from './OrdersNavBar';
import AddReview from './AddReview';

//Firebase imports
import { auth, db } from './config/Config'
import { collection, addDoc, doc, getDoc, getDocs,  query, where } from 'firebase/firestore'

//Gets userID of logged in user from Login page
import { loggedInUserID } from './Login';

export default function Orders() {
  // *****************Reviews stuff -- Maybe should be in a diff file, but oh well**********************
  // Dummy data
  const [dummyOrders, setDummyOrders] = useState([
    { id: '1', name: 'Product One', price: 10.99, quantity: 2, image: '/path/to/image1.jpg' },
    { id: '2', name: 'Product Two', price: 20.99, quantity: 1, image: '/path/to/image2.jpg' },
    { id: '3', name: 'Product Three', price: 30.99, quantity: 3, image: '/path/to/image3.jpg' },
  ]);

  //***************************Test variables*************************************
  const userID = "dhAjexEe1kpENWuEUxbH"; //Test Case
  const prodID = "WLBntFH5EyKNCXezD4SV"; // SMEG kettle
  //const prodID = "9H6OJMKeExtZQE25v50m"; // iPhone
  //const userID = "N8UIq9zUVYpIqY9TaqHD" // Kaji Katame

  return (
      <>  <OrdersNavBar/>

        <div className="review-section">
          <h1>{dummyOrders.length > 0 ? "Your Previous Orders" : "Your GoonMart Orders Will Appear Here!!!"}</h1>

          <div className="orders-grid">
            {/* ORDER ITEMS HERE */}
            {dummyOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <img src={order.image} alt={order.name} />
                  <div className="order-item-info">
                    <h2>{order.name}</h2>
                    <p>Quantity: {order.quantity}</p>
                    <p>Price: R{order.price}</p>

                    <AddReview
                      prodID = {prodID}
                      userID = {userID /*loggedInUserID*/} />
                  </div>
                </div>
            ))}
          </div>

        </div>
    </>
  );
}
