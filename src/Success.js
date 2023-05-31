import './App.css';

import React,  {useState} from 'react';
import InnerNavigationBar from './InnerNavigationBar';
import WelcomeSection from './WelcomeSection';
import Categories from './Categories';
import { useNavigate } from "react-router-dom";

export default function Success() {

  //This set of variables is used to connect the Navigation bar to the Product Grid through Categories section
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navigate = useNavigate();

  const goToHome = () =>{
    navigate('/InnerHomepage')
  }

  return (
    <div>
      <InnerNavigationBar onSearch = {handleSearch} />
      <h1>Payment Successful! </h1>
      <button className='form-btn' onClick={goToHome}>Back to Home</button>
      
    </div>
  );
}