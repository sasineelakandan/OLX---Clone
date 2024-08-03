import { useState} from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Setup'


type signPop = {
  setSignPop: any;
  setLoginPop: any;
  
};



const SignForm = (props: signPop) => {
  const [user, setuser] = useState('');
  const [userPass, setuserPass] = useState('');
  const [userCPass, setuserCPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  async function handleclick(e: any) {
    e.preventDefault();
  
    const q = query(collection(db, 'users'), where('userName', '==', user));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
     
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          userName: user,
          userPass: userPass,
          userCPass: userCPass,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }

      setuserCPass('');
      setuserPass('');
      setuser('');
      props?.setSignPop(false);
      props?.setLoginPop(true);
    } else {
      setErrorMessage('User already exists');
      
    }
  }
  return (
    <>
   
    <form  >
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
         <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
             <h1 onClick={()=>{props?.setSignPop(false)}} className="font-semibold text-3xl cursor-pointer">X</h1>
             <div className="sm:flex sm:items-start">
               <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                 <div className="mt-2">
                   <h1 className="font-semibold">Name</h1>
                   <div className="flex border-2 border-black p-2 rounded-md mt-4">
                     <input className="ml-3 outline-none w-full" placeholder="Enter your Name" value={user} onChange={(e)=>{setuser(e.target.value)}}/>
                    
                   </div>
                   {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                   <h1 className="font-semibold mt-4">Password</h1>
                   <div className="flex border-2 border-black p-2 rounded-md mt-4">
                     <input type="password" className="ml-3 outline-none w-full" placeholder="Enter your password" value={userPass} onChange={(e)=>{setuserPass(e.target.value)}}/>
                 
                   </div>
                   {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                   <h1 className="font-semibold mt-4">Confirm Password</h1>
                   <div className="flex border-2 border-black p-2 rounded-md mt-4">
                     <input type="password" className="ml-3 outline-none w-full" placeholder="Enter your Confirm password" value={userCPass} onChange={(e)=>{setuserCPass(e.target.value)}} />
                     
                   </div>
                   {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                   <button onClick={handleclick} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 mt-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sigin
                   </button>
                
                   <h1 className="text-center mt-8 text-xs">All your personal details are safe with us.</h1>
                   <h1 className="text-center mt-4 text-xs">
                     If you continue, you are accepting <span className="text-blue-500">OLX terms and conditions and privacy policy</span>.
                   </h1>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
    
   </form>
   </>
  )
}

export default SignForm