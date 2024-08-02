/* eslint-disable no-unused-vars */
import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { storage, firestore, db,  } from '../firebase/Setup';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Navabr from "./Navabr";
import Footer from "./Footer";
import Menubar from "./Menubar";

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setlocation] = useState<string>("");
  const [discription, setdiscription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [Name, setName] = useState<string>("");
  const [Phone, setPhone] = useState<string>('');
 

  const navigate = useNavigate();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    
    try {
      const imageUrls = await Promise.all(
        
        images.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name}`);
          
          await uploadBytes(imageRef, image);
          console.log(imageRef)
          const url = await getDownloadURL(imageRef);
          
          return url;
        })
      );
     
      await addDoc(collection(db, "products"), {
        title,
        category,
        Name,
        Phone,
        price,
        images: imageUrls,
        discription,
        location,
      });

      console.log("Product added");
      navigate("/");
    } catch (error) {
      console.error("Failed to add product", error);
      
    }
  };

  return (
    <Fragment>
       <Navabr/>
       <Menubar/>
      <div className="flex justify-center mt-4 items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">ProductName</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="category"
                name="category"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Discription</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="category"
                name="category"
                placeholder="Discription"
                value={discription}
                onChange={(e) => setdiscription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="category"
                name="category"
                placeholder="Location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="category"
                name="SellerName"
                placeholder="Username"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                id="category"
                name="Mobile"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                id="images"
                onChange={handleImage}
                accept="image/*"
                multiple
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <div className="flex flex-wrap mt-4 gap-2">
                {images.map((image, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center">
             
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload and Submit
                </button>
              
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default Create;
