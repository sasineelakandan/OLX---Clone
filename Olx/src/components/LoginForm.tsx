import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/Setup';
import Google from '../assets/google.png';
import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Setup';
import {  useNavigate } from 'react-router-dom'


type PropLoginF = {
    setLoginPop: any;
    setSignPop: any;
    setUserName:any
};

const LoginForm = (props: PropLoginF) => {
    const [username, setuserData] = useState('');
    const [userpass, setuserpass] = useState('');
    const [passwordMatch,setpaswordMatch]=useState(false)
    const [loginerrMsg, setloginerrMsg]=useState('')
    const navigate = useNavigate();
    const googleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    };

    const handlesubmit = async (e: any) => {
        e.preventDefault();

        try {
             
            const q = query(collection(db, 'users'), where('userName', '==', username));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
               
                if(userpass==userDoc.userCPass){
                     setpaswordMatch(true)
                    props?.setLoginPop(false)
                    props.setUserName(userDoc?.userName) 
                    localStorage.setItem('username',username);
                     navigate('/')
                     
                        
                    } else {
                        setpaswordMatch(false)
                        setloginerrMsg('Invalid credentials');
                       
                    }
                }
                
               
             else {
                setloginerrMsg('User not found');
                
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handlesubmit}>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <h1 onClick={() => { props?.setLoginPop(false) }} className="font-semibold text-3xl cursor-pointer">X</h1>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <div className="mt-2">
                                            <h1 className="font-semibold">Login</h1>
                                            <div className="flex border-2 border-black p-2 rounded-md mt-4">
                                                <input
                                                    type="text"
                                                    className="ml-3 outline-none w-full"
                                                    placeholder="Enter your Gmail"
                                                    value={username}
                                                    onChange={(e) => { setuserData(e.target.value) }}
                                                />
                                            </div>
                                            {loginerrMsg && <p style={{ color: 'red' }}>{loginerrMsg}</p>}
                                            <h1 className="font-semibold mt-4">Password</h1>
                                            <div className="flex border-2 border-black p-2 rounded-md mt-4">
                                                <input
                                                    type="password"
                                                    className="ml-3 outline-none w-full"
                                                    placeholder="Enter your password"
                                                    value={userpass}
                                                    onChange={(e) => { setuserpass(e.target.value) }}
                                                />
                                            </div>
                                            {loginerrMsg && <p style={{ color: 'red' }}>{loginerrMsg}</p>}
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 mt-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Login
                                            </button>
                                            <h1 onClick={() => { props?.setSignPop(true); props.setLoginPop(false) }} className="text-center mt-4 underline cursor-pointer">New User?</h1>
                                            <div onClick={googleSignup} className="flex border-2 border-gray-300 p-2 rounded-md mt-4 cursor-pointer">
                                                <img src={Google} alt="Google" className="h-6 w-6" />
                                                <h1 className="font-semibold ml-12">Continue with Google</h1>
                                            </div>
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
        
    );
};

export default LoginForm;
   
 