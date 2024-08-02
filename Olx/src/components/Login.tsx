// import guitar from '../assets/guitar.png'
// import phone from '../assets/phone.png'
// import Google from '../assets/google.png'
// '

// type popupProp={
//     SetloginPop:any
// }
// const Login = (props:popupProp) => {

//     const googleSignup = async () => {
        
    
//         try {
//             await signInWithPopup(auth,googleProvider)
//         } catch (err) {
//             console.log(err);
//         }
//     }
//   return (
//     <div>
//         <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
//   <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

//   <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
//       <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
//         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//             <h1 className='font-semibold text-3xl cursor-pointer' onClick={()=>{props?.SetloginPop(false)}} >X</h1>
//           <div className="sm:flex sm:items-start">
            
//             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">

//               <div className="mt-2">
//                 <img src={guitar} className='h-20 w-20 ml-32' />
//                 <p className="text-base font-medium mt-5 text-center">Help us become One of the safest  places <br /> to buy and Sell</p>
//                 <div className='flex border-2 border-black p-2 rounded-md mt-12' >
//                   <img src={phone} className='h-6 w-6' />
//                   <h1 className='font-semibold ml-3 cursor-pointer'>Continue with Phone</h1>
//                 </div>
//                 <div onClick={googleSignup} className='flex border-2 border-gray-300 p-2 rounded-md mt-4' >
//                   <img src={Google} className='h-6 w-6 cursor-pointer' />
//                   <h1 className=' font-semibold ml-12 cursor-pointer'>Continue with Google</h1>
//                 </div>
//                 <h1 className='text-center mt-4 cursor-pointer'>OR</h1>
//                 <h1 className='text-center mt-4  underline cursor-pointer'>Login with Email </h1>
//                 <h1 className='text-center mt-28 text-xs'> All your personal details are safe with us . </h1>
//                 <h1 className='text-center mt-4  text-xs'>if yoy continue, you are acepting <span className='text-blue-500'> Olx terms and <br />conditions and privacy </span></h1>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   </div>
// </div>

//     </div>
//   )
// }

// export default Login 
