import React, {useState, useContext, useEffect} from 'react';
import './Reviews.css';
import OrdersNavBar from './OrdersNavBar';
import AddReview from './AddReview';

import { CartContext } from './CartContext';

import { db } from './config/Config';
import { collection, getDocs } from '@firebase/firestore';

const loggedInUserID = sessionStorage.getItem('loggedInUserID')
// import { loggedInUserID } from './Login';

async function getOrdersFromDB(userID){
  try{
    const ordersRef = collection(db, `Users/${userID}/Orders`)
    const qSnapshot = await getDocs(ordersRef)
    
    qSnapshot.forEach((doc) => {
      for(const item of doc.data().cartItems){
        console.log("THING", item)
      }
    })
    console.log("Items from orders:", userID)
    console.log("This what you want?", qSnapshot.docs[0].data().cartItems)
  } catch(error){
    console.error("Error fetching orders:", error)
  }
}

export default function Orders() {
  // *****************Reviews stuff -- Maybe should be in a diff file, but oh well**********************
  // Dummy data
  // const [dummyOrders, setDummyOrders] = useState([
  //   { id: '1', name: 'Product One', price: 10.99, quantity: 2, image: '/path/to/image1.jpg' },
  //   { id: '2', name: 'Product Two', price: 20.99, quantity: 1, image: '/path/to/image2.jpg' },
  //   { id: '3', name: 'Product Three', price: 30.99, quantity: 3, image: '/path/to/image3.jpg' },
  // ]);
  const { cartItems, getOrders } = useContext(CartContext);
  // const [dummyOrders, setDummyOrders] = useState([]);

  useEffect(() => {
    getOrders()
  }, [])
  console.log("CART:", cartItems)

  // useState(() => {
  //   setDummyOrders(cartItems)
  // }, [cartItems])

  // setDummyOrders(userCartItems)

  //***************************Test variables*************************************

  const userID = sessionStorage.getItem('loggedInUserID')
  //const prodID = "WLBntFH5EyKNCXezD4SV"; // SMEG kettle
  //const prodID = "9H6OJMKeExtZQE25v50m"; // iPhone
  //const userID = "N8UIq9zUVYpIqY9TaqHD" // Kaji Katame

  return (
      <>  <OrdersNavBar/>

        <div className="review-section">
          <h1>{cartItems.length > 0 ? "Your Previous Orders" : "Your GoonMart Orders Will Appear Here!!!"}</h1>

          <div className="orders-grid">
            {/* ORDER ITEMS HERE */}
            {cartItems.map((order) => (
                <div key={order.id} className="order-item">
                  {/* <img src={order.image} alt={order.name} /> */}
                  <div className="order-item-info">
                    <h2>{order.name}</h2>
                    <p>Quantity: {order.quantity}</p>
                    <p>Price: R{order.price}</p>

                    <AddReview
                      prodID = {order.id}
                      userID = {userID /*loggedInUserID*/} />
                  </div>
                </div>
            ))}
          </div>

        </div>
    </>
  );
}