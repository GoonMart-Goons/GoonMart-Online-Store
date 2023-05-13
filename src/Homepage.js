import './App.css';

import React,  {useState} from 'react';
import NavigationBar from './NavigationBar';
import WelcomeSection from './WelcomeSection';
import Categories from './Categories';

export default function Homepage() {

  //This set of variables is used to connect the Navigation bar to the Product Grid through Categories section
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <NavigationBar onSearch = {handleSearch} />
      <WelcomeSection />
      <Categories searchQuery = {searchQuery} />
      
    </div>
  );
}

