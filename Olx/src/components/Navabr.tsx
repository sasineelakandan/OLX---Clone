import olx from '../assets/OLX-Symbol.png'
import lens from '../assets/lens.png'
import arrow from '../assets/arrow.png'
import search from '../assets/search.png'
import { Link } from 'react-router-dom';
import { useState,useEffect,createContext} from 'react'
import LoginForm from './LoginForm'
import SignForm from './SignForm'




const UserContext = createContext<any>(undefined);

const Navbar = () => {
  const [loginPop, setLoginPop] = useState(false);
  const [signPop, setSignPop] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUserName('');
  };

  return (
    <UserContext.Provider value={{ userName }}>
      <div className='flex p-4 bg-slate-100 shadow-md'>
        <img src={olx} className='w-11 h-9' alt='OLX' />
        <div className='flex border border-spacing-1 w-84 p-2 border-black bg-white ml-5'>
          <img src={lens} className='w-6 h-5 mt-1' alt='Lens' />
          <input placeholder='Locations' className='ml-3 outline-none' />
          <img src={arrow} className='w-8 h-7' alt='Arrow' />
        </div>
        <div className='flex h-12 ml-4 border border-black bg-white'>
          <input placeholder='Find cars, mobile phones and more' className='ml-3 w-96 outline-none' />
          <img src={search} className='w-15 h-12' alt='Search' />
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
          <h1 className='font-semibold'>English</h1>
          <img src={arrow} className='w-8 h-7' alt='Arrow' />
        </div>
        <Link to="/sell" className='w-28 flex h-12 p-2 ml-8 cursor-pointer rounded-full border border-yellow-400'>
          <h1 className='font-bold text-lg ml-4'>+SELL</h1>
        </Link>
        <div className='w-50 flex h-12 p-2 ml-8 cursor-pointer '>
          <h1 className='font-bold text-lg'>Hey! {userName}</h1>
        </div>
        {!userName ? (
          <div onClick={() => setLoginPop(!loginPop)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold'>Login</h1>
          </div>
        ) : (
          <div className='flex h-10 cursor-pointer'>
            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-6'>
              Logout
            </button>
          </div>
        )}
        {loginPop && <LoginForm setLoginPop={setLoginPop} setSignPop={setSignPop} setUserName={setUserName} />}
        {signPop && <SignForm setSignPop={setSignPop} setLoginPop={setLoginPop} />}
      </div>
    </UserContext.Provider>
  );
};

export default Navbar;