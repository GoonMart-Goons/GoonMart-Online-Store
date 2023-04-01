import './App.css';

import React from 'react';
import NavigationBar from './NavigationBar';
import WelcomeSection from './WelcomeSection';
import Categories from './Categories';
import ProductGrid from './ProductGrid';
import ProductCard from './ProductCard';

export default function Homepage() {
  return (
    <div>
      <NavigationBar />
      <WelcomeSection />
      <Categories />
      <ProductGrid />
      <ProductCard />
    </div>
  );
}

