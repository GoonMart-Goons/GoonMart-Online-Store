import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { db } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProductGrid = ({ activeCategoryName, searchQuery }) => {
  const [DBproducts, setDBproducts] = React.useState([]);

  const dataBase = async () => {
    const prodsRef = collection(db, 'Products');
    let q;

    if (searchQuery === '') {
      if (activeCategoryName === 'All') {
        q = query(prodsRef, where('category', 'in', ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys & Games']));
      } else {
        q = query(prodsRef, where('category', '==', activeCategoryName));
      }

      const querySnapshot = await getDocs(q);
      const DBproducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      return DBproducts;
    }

    q = query(prodsRef, where('category', 'in', ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys & Games']));
    const querySnapshot = await getDocs(q);
    const DBproducts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });

    const filteredProducts = searchQuery
      ? DBproducts.filter((product) => product.prodName.toLowerCase().includes(searchQuery.toLowerCase()))
      : DBproducts;

    return filteredProducts;
  };

  React.useEffect(() => {
    dataBase().then((products) => {
      setDBproducts(products);
    });
  }, [activeCategoryName, searchQuery]);

  return (
    <div className="product-grid">
      {DBproducts.map((product) => {
        return (
          <ProductCard
            key={product.id}
            prodName={product.prodName}
            image={product.imageURL}
            price={product.price}
            id={product.id}
            quantity={product.quantity}
            prodDesc={product.prodDesc}
            category={product.category}
            salePercentage={product.salePercentage} // Add the salePercentage prop
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
