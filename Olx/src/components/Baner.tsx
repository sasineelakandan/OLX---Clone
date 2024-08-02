
import Baners from '../assets/OLX.jpg'
const Baner = () => {
  return (
   
        <div className="bg-gray-100 flex justify-center items-center py-6">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-4">
          
            <div className="flex justify-center items-center">
              <img
                src={Baners}
                alt="Banner"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      );
  
}

export default Baner


