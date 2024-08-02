
import Main from './components/Main'
import SellForm from './components/SellingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


    function App() {
      
      return (
        <Router>
          <Routes>
            
            <Route path="/" element={<Main  />} />
            <Route path="/sell" element={<SellForm/>} />
          </Routes>
        </Router>
      );
    }
    
  
 




export default App
