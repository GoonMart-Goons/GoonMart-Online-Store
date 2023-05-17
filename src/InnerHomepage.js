import './App.css';

import React,  {useState} from 'react';
import InnerNavigationBar from './InnerNavigationBar';
import Categories from './Categories';
/*import ProductGrid from './ProductGrid';
import ProductCard from './ProductCard';*/ 

export default function InnerHomepage({userInfo}) {

  //This set of variables is used to connect the Navigation bar to the Product Grid through Categories section
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <InnerNavigationBar  onSearch = {handleSearch}/>
      <Categories searchQuery = {searchQuery} />
      {/*<ProductGrid />
      <ProductCard />*/}
    </div>
  );
}



