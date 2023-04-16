import React from 'react';
import {FaSearch} from 'react-icons/fa';
  

function InnerNavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/goonmart-logo.png"/>
      </div>
      <div className="navbar-center">
        <ul className="navbar-menu">
          <li className="navbar-menu-item">
            <a href="/InnerHomepage">Home</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/InnerHomepage">Orders</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/InnerHomepage">My Account</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/InnerHomepage">About</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/InnerHomepage">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" />
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default InnerNavigationBar;
