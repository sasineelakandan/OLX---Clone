
import Details from './components/Details';
import Main from './components/Main'
import SellForm from './components/SellingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


    function App() {
      
      return (
        <Router>
          <Routes>
            
            <Route path="/" element={<Main  />} />
            <Route path="/sell" element={<SellForm/>} />
            <Route path='/details' element={<Details/>} /> 
          </Routes>
        </Router>
      );
    }
    
  
 




export default App
