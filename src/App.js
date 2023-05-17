
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import React from 'react';
import Homepage from './Homepage';
import InnerHomepage from './InnerHomepage';
import Register from './Register';
import Login from './Login';
import ProductPageNew from './ProductPageNew';
import Cart from './Cart';
import Orders from './Orders';
import { CartProvider } from './CartContext';  // import CartProvider


function App() {
  return (
    <div>
        <CartProvider>  {/* wrap your main App component with CartProvider */}
            <Router>
                <Routes>
                    <Route path = "/" index element = {<Homepage />} />
                    <Route path = "/register" element = {<Register />} />
                    <Route path = "/login" element = {<Login />} />
                    <Route path = "/InnerHomepage" element = {<InnerHomepage />} />
                    <Route path = "/productpagenew" element = {<ProductPageNew />} />
                    <Route path = "/product/:id" element = {<ProductPageNew />} />
                    <Route path = "/cart" element = {<Cart />} />
                    <Route path = "/orders" element = {<Orders />} />
                </Routes>
            </Router>
        </CartProvider>  {/* wrap your main App component with CartProvider */}
    </div>
  );
}

export default App;
