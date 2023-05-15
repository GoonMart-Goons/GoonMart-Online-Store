import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
//import { categories } from './Categories';

import phoneSale from './imgs/phone.jpg';
import cookWare from './imgs/cookware.jpg';
import shirt from './imgs/tshirt.jpg';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';


const ProductGrid = ({activeCategoryName, searchQuery}) => {

  //Initialise empty array of database products
  const [DBproducts, setDBproducts] = React.useState([]);

  const dataBase = async () => {

    //Enter the Products collection in the database
    const prodsRef = collection(db, 'Products');
    let q;

    /*
    //---CASE SENSITIVE IMPLEMENTATION---
    if (searchQuery !== '') {
      q = query(prodsRef, where('prodName', '>=', searchQuery), where('prodName', '<=', searchQuery + '\uf8ff'));
    } else if (activeCategoryName === 'All') {
      q = query(prodsRef, where('category', 'in', ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys & Games']));
    } else {
      q = query(prodsRef, where('category', '==', activeCategoryName));
    }

    const querySnapshot = await getDocs(q);
    const DBproducts = querySnapshot.docs.map(doc => doc.data());
    return DBproducts; */

    //When no item is being searched for explicitly
    if (searchQuery === '') {
      if (activeCategoryName === 'All') {
        //Recover the products from all our categories
        q = query(prodsRef, where('category', 'in', ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys & Games']));
      } else {
        //Recover the products from the current category
        q = query(prodsRef, where('category', '==', activeCategoryName));
      }
  
      const querySnapshot = await getDocs(q);
      //Fill the array with recovered products (and add the id property)
      const DBproducts = querySnapshot.docs.map((doc) =>  {
        const data = doc.data();
        //Adds the id property to each product
        data.id = doc.id;
        return data;
      });
      return DBproducts;
    }
    
    //Else if the search ar is being used to search for a specific product
    //Get all products
    q = query(prodsRef, where('category', 'in', ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys & Games']));
    const querySnapshot = await getDocs(q);
    const DBproducts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      //Adds the id property to each product
      data.id = doc.id;
      return data;
    });

    //this allows for a case insensitive search of the seach term and database
    const filteredProducts = searchQuery
    ? DBproducts.filter((product) => product.prodName.toLowerCase().includes(searchQuery.toLowerCase()))
    : DBproducts;

    return filteredProducts;
  };

  //call the dataBase function and set the DBproducts array to the array that is returned
  React.useEffect(() => {
    dataBase().then(products => {
      setDBproducts(products);
    });
  }, [activeCategoryName, searchQuery]);

  return (
    <div className="product-grid">
      {/* Iterate through all the products in the array and display each product card */}
      {DBproducts.map(product => {
          return (
            <ProductCard
              /*key={product.id}*/
              prodName={product.prodName}
              image={product.imageURL}
              ratingSum={product.ratingSum}
              ratingCount={product.ratingCount}
              /*reviews={product.reviews}*/
              price={product.price}
              id ={product.id}
              quantity = {product.quantity}
              prodDesc = {product.prodDesc}
              category = {product.category}
            />
          );
        })
      }
    </div>
  );
}

export default ProductGrid;