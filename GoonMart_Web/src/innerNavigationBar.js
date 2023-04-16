import React from 'react';
import {FaSearch} from 'react-icons/fa';
  

function InnerNavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div><img src= "/goonmart-logo.png" width = {200}/></div>
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Search" />
          <button type="submit" className="search-button">
            <FaSearch/>
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li >
            <a className="navbar-menu-item" href="/InnerHomepage">HOME</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="/InnerHomepage">ORDERS</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="/InnerHomepage">MY ACCOUNT</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="/InnerHomepage">ABOUT</a>
          </li>
          <li>
            <a className="navbar-menu-item" href="/InnerHomepage">CONTACT US</a>
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
