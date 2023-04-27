import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';


/*const products = [
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: 18900,
    category: 1,
    description: "Latest of the Apple iPhone range",
    content: "This is a premium cellular device with an aluminium frame and ultra tempered protective glass. The phone comes with 128GB of storage and I have ran out of lies to say so I am just going to end this reasonably sized paragraph here.",
    
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00',
    category: 2
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00',
    category: 3
  } /*,
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 1,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 2,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 3,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  }, */
];

const ProductGrid = ({activeCategoryId}) => {

  const filteredProducts = activeCategoryId === 0 
  ?  products : products.filter(product => product.category === activeCategoryId);

  return (
    <div className="product-grid">
      {filteredProducts.map(product => {
        return (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            price={product.price}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
