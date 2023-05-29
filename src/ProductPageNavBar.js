import React, {useState} from 'react';
import {FaCartPlus, FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

//Snackbar Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ProductPageNavBar(/*userID*/) {
  //const userIDtest = undefined //"dhAjexEe1kpENWuEUxbH";
  //console.log("login ID outside:",userID[0] )
  const navigate = useNavigate();

  /*const handleHomeClick = () => {
    if (userID[0] !== undefined) {
      navigate('/InnerHomepage');
    } else {
      navigate('/');
    }
  };

  //Snackbar code
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOrdersClick = () => {
    if (userID[0] !== undefined) {
      navigate('/Orders');
    } else {
      //Show unsuccessful snackbar
      setOpenSnackbar(true);
      setSnackbarMessage('Failed: You need to log in to view orders');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };*/

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
            <a className="navbar-menu-item"  href="./Orders" /*onClick={handleOrdersClick}*/ >ORDERS</a>
          </li>
          
          <li>
            <a className="navbar-menu-item" href="./InnerHomepage" /*onClick={handleHomeClick}*/ >HOME</a>
          </li>
        </ul>

        {/*Snackbar UI
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity={snackbarMessage.startsWith('Failed') ? 'error' : 'success'}
            >
              {snackbarMessage}
            </MuiAlert>
        </Snackbar> */}
      </div>
      
    </nav>
  );
}

export default ProductPageNavBar;
