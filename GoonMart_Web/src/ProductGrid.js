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
