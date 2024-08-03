import { Fragment, ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage,  db } from '../firebase/Setup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navabr from './Navabr';
import Footer from './Footer';
import Menubar from './Menubar';

// Define the form input types
interface IFormInput {
  title: string;
  price: number;
  category: string;
  location: string;
  description: string;
  name: string;
  phone: string;
  images: File[];
}

const Create = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();
  const navigate = useNavigate();

  useEffect(() => {
    // Create object URLs when images change
    const previews = images.map(image => URL.createObjectURL(image));
    setImagePreviews(previews);

    // Clean up object URLs when component unmounts or images change
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const imageUrls = await Promise.all(
        data.images.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          const url = await getDownloadURL(imageRef);
          return url;
        })
      );

      await addDoc(collection(db, 'products'), {
        ...data,
        images: imageUrls
      });

      console.log('Product added');
      navigate('/');
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setValue('images', Array.from(e.target.files));
    }
  };

  return (
    <Fragment>
      <Navabr />
      <Menubar />
      <div className="flex justify-center mt-4 items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                {...register('title', { required: 'Product name is required' })}
                className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="title"
                placeholder="Name"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                {...register('category', { required: 'Category is required' })}
                className={`mt-1 block w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="category"
                placeholder="Category"
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                {...register('description', { required: 'Description is required' })}
                className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="description"
                placeholder="Description"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                {...register('location', { required: 'Location is required' })}
                className={`mt-1 block w-full p-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="location"
                placeholder="Location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seller Name</label>
              <input
                {...register('name', { required: 'Seller name is required' })}
                className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="name"
                placeholder="Username"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                className={`mt-1 block w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="text"
                id="phone"
                placeholder="Phone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                {...register('price', { 
                  required: 'Price is required', 
                  valueAsNumber: true, 
                  validate: value => value > 0 || 'Price must be a positive number' 
                })}
                className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                type="number"
                id="price"
                placeholder="Price"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                id="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <div className="flex flex-wrap mt-4 gap-2">
                {imagePreviews.map((url, i) => (
                  <img
                    key={i}
                    src={url}
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
      <Footer />
    </Fragment>
  );
};

export default Create;
