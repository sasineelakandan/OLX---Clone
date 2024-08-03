


const Footer= () => {
  return (
    <footer className="bg-gray-800 text-white">
      
      <div className="bg-cyan-950 py-4">
        <h1 className="text-center text-white text-sm md:text-base">
          All rights reserved @ 2006-2024 OLX
        </h1>
      </div>

      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4 space-y-4 md:space-y-0">
    
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Sasi Devan</h2>
          <p className="text-sm mt-1">&copy; 2024 Your Company. All rights reserved.</p>
        </div>

    
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>

        
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
