import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './AccountSettings.css';
import AccountDB from './services/AccountDB';
import DeliveryDets from './DeliveryDets';
import UserReviews from './services/UserReviews';
import AddressDB from './services/AddressDB';
import ProductPageNavBar from './ProductPageNavBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (

        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [receivedMessage, setReceivedMessage] = React.useState('');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 //const[user,setUser]=React.useState('Samsung Galaxy Tab S8 Ultra');
 React.useEffect(() => {
  const storedMessage = localStorage.getItem('message');
  // If you used JSON.stringify() to store complex data, you can use JSON.parse() here
  // const storedMessage = JSON.parse(localStorage.getItem('message'));
}, []);
console.log(receivedMessage);

  return (
    <>
    <ProductPageNavBar />
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',height: '100vh' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider'}}
      >
        <Tab label="Personal Details" {...a11yProps(0)} sx={{ height:'33vh'}} />
        <Tab label="Delivery Details" {...a11yProps(1)} sx={{ height:'33vh'}}/>
        <Tab label="Reviews" {...a11yProps(2)} sx={{ height:'33vh'}}/>
      </Tabs>
      <TabPanel value={value} index={0}>
      <AccountDB user={localStorage.getItem('message')}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AddressDB user={localStorage.getItem('message')}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <p>Past Reviews</p>
      <hr />
      <UserReviews user={localStorage.getItem('message')}/>
      </TabPanel>
    </Box>
    </>
  );
}
export default VerticalTabs;