import React,  {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
  

function NavigationBar({ onSearch }) {

  //Variables used for the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Called when enter is hit after information has been entered into the search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    //The logo section of the navigation bar
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/imgs/goonmart-logo.png" alt='goonmart logo'/>
        <span><b>GoonMart</b></span>
      </div>

      {/* the search bar and butteon section of the navigation bar */}
      <div className="navbar-center">
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" 
          className="search-input" 
          placeholder="Search" 
          value={searchTerm}
          /* This dynamically updatets the searchTerm variable anytime the info in the search box is changed */
          onChange={(event) => setSearchTerm(event.target.value)}
          />
            <button type="submit" className="search-button" data-testid="search-button">
                <FaSearch data-testid="fa-search-icon" />
            </button>
        </form>
      </div>

      {/*The register/login button section of the navigation bar*/}
      <div className="navbar-right">
        <button> <a href="./Login" className="nav-link">LOGIN</a></button>
        <button><a href="./Register" className="nav-link">REGISTER</a></button>
      </div>
    </nav>
  );
}

export default NavigationBar;
