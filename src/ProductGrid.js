import React from 'react';
import ProductCard from './ProductCard';
import phoneSale from './phone.jpg';
import cookWare from './cookware.jpg';
import shirt from './tshirt.jpg';

const products = [
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
    id: 4,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 5,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 6,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 7,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 8,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 9,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 10,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 11,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 12,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 13,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 14,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 15,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 16,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 17,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 18,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 19,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 20,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 21,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 22,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 23,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 24,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
  {
    id: 25,
    name: 'Product 1',
    image: phoneSale,
    rating: 4,
    reviews: 10,
    price: '$10.00'
  },
  {
    id: 26,
    name: 'Product 2',
    image: shirt,
    rating: 3,
    reviews: 5,
    price: '$20.00'
  },
  {
    id: 27,
    name: 'Product 3',
    image: cookWare,
    rating: 5,
    reviews: 20,
    price: '$15.00'
  },
];

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {products.map(product => {
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
