import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import {BG_URL} from "../utils/constants";




const Login =() =>{

const name =useRef(null);    
const email =useRef(null);
const password =useRef(null);
const dispatch =useDispatch();


const [isLogin,setIsLogin] =useState("true");
const [errorMessage,setErrorMessage] =useState(null);

const toggleForm =()=>{
setIsLogin(!isLogin);

}

const handleButtonClick =()=>{

 //console.log(email.current.value);
//console.log(password.current.value);   
const message=checkValidateData(email.current.value,password.current.value);
setErrorMessage(message);

if(message) return; //error message

if(!isLogin){

    //sign up

    createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      //console.log("line48",name.current.value,);
      //update profile
      updateProfile(user, {
        displayName: name.current.value, photoURL: USER_AVATAR
      }).then(() => {

       
         const {uid, email, displayName,photoURL} = auth.currentUser;

         dispatch(
          addUser(
            {
              uid:uid, email:email, displayName :displayName,photoURL:photoURL
            }
          
          ) );
        //  console.log("uline 64 pdate sign up ")
        // ...
      }).catch((error) => {
        // An error occurred
        setErrorMessage(errorMessage);
      });
   // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode ,"-",errorMessage);
      // ..
    });


} else 
{
//sign in 

signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
   // console.log("before sign in  ");
    const user = userCredential.user;
   //console.log("After sign in  ",user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode ,"-",errorMessage);

  });

}

}

return(

    <div >
        <Header/>
        <div className='absolute'> 
            <img src ={BG_URL} alt ="logo"/>
        </div>
     <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 absolute text-white rounded-lg bg-opacity-80"> 

        <h1 className='font-bold text-3xl py-4'>{isLogin ? "Sign In" : "Sign Up"}</h1>
         {!isLogin && (<input ref={name} type="text" placeholder="Full Name" className=" p-4 my-4 w-full bg-gray-700"/>)
         }
        <input  ref={email} type="text" placeholder="Email Address" className=" p-4 my-4 w-full bg-gray-700" />

        <input ref={password} type='password' placeholder='Password' className=' p-4 my-4 w-full bg-gray-700'/>

        <p className="text-red-500">{errorMessage}</p>

        <button className=" p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>Sign In</button>

        <p className='py-4' onClick={toggleForm}>{isLogin ?"New to Netflix? Sign Up Now" :"Already Registered? Sign In Now"}</p>
     </form>

    </div>


)

};

export default Login;