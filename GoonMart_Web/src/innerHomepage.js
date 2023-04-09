import './App.css';

import React from 'react';
import InnerNavigationBar from './innerNavigationBar';
import Categories from './Categories';
import ProductGrid from './ProductGrid';
import ProductCard from './ProductCard';

export default function InnerHomepage() {
  return (
    <div>
      <InnerNavigationBar />
      <Categories />
      <ProductGrid />
      <ProductCard />
    </div>
  );
}



