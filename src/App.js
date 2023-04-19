
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import React from 'react';
import Homepage from './Homepage';
import InnerHomepage from './InnerHomepage';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div>
      <Router> 
        <Routes>
            <Route path = "/" index element = {<Homepage />} />
            <Route path = "/register" element = {<Register />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/InnerHomepage" element = {<InnerHomepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
