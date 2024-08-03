import { collection, query,  getDocs } from 'firebase/firestore';
import { db } from '../firebase/Setup'
import { useState,useEffect } from 'react';
import Baner from './Baner';
import { Link } from 'react-router-dom';

type Product={
category: string;
id : string;
images: string[], 
price: string; 
title: string;
discription:string
location:string
Phone:string
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
          <Link  to='/details' key={product.id } state={{product}}>
            <div className="border border-spacing-1 p-2 mt-3 ml-3">
              <img src={product.images[0]} alt={product.title} className="w-60 h-48" />
              <h1 className="font-bold text-xl">{product.title}</h1>
              <h1>₹ {product.price}</h1>
              <h1>{product.location}</h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
  
  