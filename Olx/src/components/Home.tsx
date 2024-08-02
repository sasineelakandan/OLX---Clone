import { collection, query,  getDocs } from 'firebase/firestore';
import { db } from '../firebase/Setup'
import { useState,useEffect } from 'react';
import Baner from './Baner';

type Product={
category: string;
id : string;
images: string[], 
price: string; 
title: string;
discription:string
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList : Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() ,
        })as Product);
        
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
    <Baner/>
    <div className="grid grid-cols-4 p-5">
      {products.map((product) => (
        <div key={product.id} className="border border-spacing-1 p-2 mt-3 ml-3">
          <img src={product.images[0]} alt={product.title} className="w-60 h-48" />
          <h1 className="font-bold text-xl">{product.title}</h1>
          <h1>₹ {product.price}</h1>
          <h1>{product.discription}</h1>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default Home
  
  