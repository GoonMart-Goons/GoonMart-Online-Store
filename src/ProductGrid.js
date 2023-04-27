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
  } ];*/

const ProductGrid = ({activeCategoryName}) => {

  const [DBproducts, setDBproducts] = React.useState([]);

  async function dataBase(){
    const prodsRef = collection(db, 'Products')
    // console.log(activeCategoryName);
    let q
    if (activeCategoryName in ["All", "Electronics", "Clothing", "Home & Kitchen", "Toys & Games"]){
      if (activeCategoryName === "All"){
        q = query(prodsRef, where('category', 'in', ["Electronics", "Clothing", "Home & Kitchen", "Toys & Games"]))
      } else {
        q = query(prodsRef, where('category', '==', activeCategoryName))
      }
    //If activeCategoryName not a category, does search instead
    } else {
      q = query(
        prodsRef,
        where('prodName', '>=', activeCategoryName),
        where('prodName', '<=', activeCategoryName + '\uf8ff'),
      )
    }
    
    const querySnapshot = await getDocs(q)
    //Queried documents
    const DBproducts = querySnapshot.docs.map(doc => doc.data());
    //console.log(DBproducts);
    return DBproducts;
  }
  
  React.useEffect(() => {
    dataBase().then(products => {
      setDBproducts(products);
    });
  });

  /*const filteredProducts = activeCategoryId === 0 
  ?  products : products.filter(product => product.category === activeCategoryId);*/

  return (
    <div className="product-grid">
      {DBproducts.map(product => {
          return (
            //FIXME product.imageURL works perfectly fine when logging here, idk why it breaks
            // console.log(product.prodName, product.imageURL),
            <ProductCard
              // key={product.id}
              prodName={product.prodName}
              image={product.imageURL}
              ratingSum={product.ratingSum}
              ratingCount={product.ratingCount}
              /*reviews={product.reviews}*/
              price={product.price}
            />
          );
        })
      }
    </div>
  );
}

export default ProductGrid;
