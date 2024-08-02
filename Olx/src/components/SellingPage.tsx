import  { useState } from 'react';
import { collection, addDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db ,storage} from '../firebase/Setup'
const SellForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [categorys, setcategorys] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState('');

  const handleImageChange = (e:any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!productName)  setErrors("Product name is required.");
    if (!description) setErrors("Description is required.") 
    if (!price) setErrors("Price is required.")
   if (!location) setErrors("location is required.") 
    if (!categorys) setErrors("categorys is required.")   
    if (!image) setErrors("Image is required.") 
    
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async(e:any) => {
    let imageUrl = '';

    // If an image is selected, upload it to Firebase Storage
    if (image) {
      const imageRef = ref(storage, `${image}`);
      const uploadResult = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(uploadResult.ref);
    }
    e.preventDefault();
    if(validate()){
       const docRef = await addDoc(collection(db, 'Items'), {
         productName:productName,
        description:description,
        location:location,
        categorys:categorys,
        price:price,
        image:imageUrl,
      });
      console.log('Document written with ID: ', docRef);
    }
      
     
      setProductName('');
      setDescription('');
      setPrice('');
      setcategorys('')
      setLocation('')
      setImage(null);
     
    }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg mt-10 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Sell Your Product</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Product Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">location</label>
        <textarea
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        ></textarea>
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Categorys</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={categorys}
          onChange={(e) => setcategorys(e.target.value)}
          required
        />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          className="w-full p-2 border rounded"
          onChange={handleImageChange}
        />
        {image && (
          <div className="mt-2 text-gray-600">
            Selected file: {image}
          </div>
        )}
      </div>
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
      <button type="submit" className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}

export default SellForm;
