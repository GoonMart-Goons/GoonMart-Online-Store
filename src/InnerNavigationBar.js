import React, {useState} from 'react';
import {FaCartPlus, FaSearch} from 'react-icons/fa';
  

function InnerNavigationBar({onSearch}) {

  //Variables used for the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Called when enter is hit after information has been entered into the search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    //The logo section of the navigation bar
    <nav className="navbar" data-testid="inner-nav-bar">
      <div className="navbar-left">
        <div><img src= "/goonmart-logo.png" width = {200} alt='goonmart logo'/></div>
        {/* the search bar and butteon section of the navigation bar */}
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" 
          className="search-input" 
          placeholder="Search" 
          value={searchTerm}
          /* This dynamically updatets the searchTerm variable anytime the info in the search box is changed */
          onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
      {/*The navigation section to head over to different pages*/}
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li>
            <a className="navbar-menu-item" href="./Cart" aria-label="Cart"><FaCartPlus/></a>
          </li>
          <li>
            <a className="navbar-menu-item" href="./Orders">ORDERS</a>
          </li>
          
          <li>
            <a className="navbar-menu-item" href="./InnerHomepage">MY ACCOUNT</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="./InnerHomepage">ABOUT</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="/">LOG OUT</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
}

export default InnerNavigationBar;
