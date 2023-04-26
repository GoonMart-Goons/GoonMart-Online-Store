import React from 'react';
import ProductCard from './ProductCard';
//import { categories } from './Categories';

import phoneSale from './phone.jpg';
import cookWare from './cookware.jpg';
import shirt from './tshirt.jpg';

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

const ProductGrid = (/*{activeCategoryId}*/) => {

  async function dataBase(){
    const prodsRef = collection(db, 'Products')
    const q = query(prodsRef, where('category', 'in', ["Electronics", "Clothing", "Home & Kitchen", "Toys & Games"]))
    const querySnapshot = await getDocs(q)
    //Queried documents
    const DBproducts = querySnapshot.docs.map(doc => doc.data());
    return DBproducts;
  }
  
  const [DBproducts, setDBproducts] = React.useState([]);

  React.useEffect(() => {
    dataBase().then(products => {
      setDBproducts(products);
    });
  }, []);

  /*const filteredProducts = activeCategoryId === 0 
  ?  products : products.filter(product => product.category === activeCategoryId);*/

  return (
    <div className="product-grid">
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
            />
          );
        })
      }
    </div>
  );
}

export default ProductGrid;
