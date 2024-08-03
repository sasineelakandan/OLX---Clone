import { useLocation } from "react-router-dom"
import Menubar from "./Menubar"
import Navbar from "./Navabr"
import Images from "../assets/images.png"
import Call from '../assets/png-transparent-computer-icons-call-icon-cdr-text-copyright.png'
import locationImg from '../assets/pngtree-vector-location-icon-png-image_956422.jpg'
import Footer from "./Footer"
const Details = () => {
    const location= useLocation()
    const state = location.state 
    const { product } = state;
  return (
    <div>
        <Navbar/>
        <Menubar/>
        <div className="p-5">
      <header className="text-center mb-5">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <h2 className="text-xl text-gray-600">₹ {product.price}</h2>
      </header>

      <div className="flex">
        {/* Product Images */}
        <div className="flex-1">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto mb-4"
          />
          
        </div>

        {/* Product Details */}
        <div className="flex-1 ml-5">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>
          <p>{product.location}</p>
         
          <div className="mt-5 border-t pt-3">
            <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
            <div className="flex items-center">
              <img
                src={Images}
                alt={product.Name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{product.Name}</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <img
                src={Call}
                alt={product.Name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{product.Phone}</p>
              </div>
              
            </div>
            <div className="flex items-center mt-2">
              <img
                src={locationImg}
                alt={product.Name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{product.location}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  ;
  
  <Footer/>

    </div>
  )
}

export default Details