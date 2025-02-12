import React, { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
 const dispatch =useDispatch();

  const navigate=useNavigate();
  const user=useSelector(store=>store.user);

  const showGptSearch =useSelector((store)=>store.gpt.showGptSearch);

const handleSignOut=()=>{

  signOut(auth).then(() => {
    // Sign-out successful.
   // navigate('/');
    }).catch((error) => {
    // An error happened.
    navigate('/error');
  });
}

useEffect(()=>{

  const unsubscribe= onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const {uid, email, displayName,photoURL} = user;
      //console.log("Before dispatch 1",user);

      dispatch(addUser({uid:uid, email:email, displayName :displayName,photoURL:photoURL}));
     // console.log("After dispatch 2");
      navigate("/browse");
    //  console.log("After browse  3");
      // ...
    } else {
      // User is signed out
      // ...
      dispatch(removeUser());
      navigate("/");
    }
  });


return () => unsubscribe();

},[]);

const handleGptSearchClick =()=>{
  //toggle gpt search
  dispatch(toggleGptSearchView());
}

const handleLanguageChange =(e)=>{

   console.log(e.target.value);
  
  dispatch(changeLanguage(e.target.value));

};
 

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between flex-col md:flex-row justify'>
   <img className='w-44 mx-auto md:mx-0 ' src={LOGO} alt="logo"/>
    
   {user && (
     <div className='flex p-2'>

    {showGptSearch && ( <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange} >
        {SUPPORTED_LANGUAGES.map(lang=><option  key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
      </select>)}

      <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch? "Homepage" :"GPT Search"}</button>
       <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
       <button className='font-bold text-white' onClick={handleSignOut}>(Sign Out)</button>
    </div>
    )
    }
    
    </div>
  )
}

export default Header