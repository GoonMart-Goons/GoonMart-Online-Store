
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import React from 'react';
import Homepage from './Homepage';
import InnerHomepage from './InnerHomepage';
import Register from './Register';
import Login from './Login';
import ProductPage from './ProductPage';
import ProductPageNew from './ProductPageNew';
import Cart from './Cart';
import Orders from './Orders';
import Checkout from './Checkout';

function App() {
  return (
    <div>
      <Router> 
        <Routes>
            <Route path = "/d" index element = {<Homepage />} />
            <Route path = "/register" element = {<Register />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/InnerHomepage" element = {<InnerHomepage />} />
            <Route path = "/productpage" element = {<ProductPage />} />
            <Route path = "/productpagenew" element = {<ProductPageNew />} />
            <Route path = "/cart" element = {<Cart />} />
            <Route path = "/orders" element = {<Orders />} />
            <Route path="/" element = {<Checkout/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
