import React, {useState} from 'react';
import {FaCartPlus, FaSearch} from 'react-icons/fa';


function OrdersNavBar() {

    return (
        //The logo section of the navigation bar
        <nav className="navbar" data-testid="prodpage-nav-bar">
            <div className="navbar-left">
                <div><img src= "/goonmart-logo.png" width = {200} alt='goonmart logo'/></div>
            </div>
            {/*The navigation section to head over to different pages*/}
            <div className="navbar-right">
                <ul className="navbar-menu">
                    <li>
                        <a className="navbar-menu-item" href="./Cart"><FaCartPlus/></a>
                    </li>
                    <li>
                        <a className="navbar-menu-item" href="./Orders">ORDERS</a>
                    </li>

                    <li>
                        <a className="navbar-menu-item" href="./InnerHomepage">HOME</a>
                    </li>
                </ul>
            </div>

        </nav>
    );
}

export default OrdersNavBar;
