import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

   const dispatch =useDispatch();
    const langKey =useSelector((store)=> store.config.lang);
    const searchText =useRef(null);
   // console.log(searchText);

   //search movie in TMDB
  const searchMovieTMDB =async (movie)=>{
   
  const data =await fetch("https://api.themoviedb.org/3/search/movie?query=" +movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS);


  const json=await data.json();
   return json.results;
  }

     const handleGptSearchClick =async ()=>{

       console.log(searchText.current.value);
       //make an api call to GPT API and get movie results
        const gptQuery ="Act as a Movie Recommendation system and suggest some movies for the query :" +searchText.current.value +". only give me names of 5 movies, comma seperated like the example results given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi Mil Gaya";
      const gptResults=await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo ',
      });

      if(!gptResults.choices){
           //write error handling

           console.log("Gpt api fail")
      }

      console.log(gptResults.choices?.[0]?.message?.content);
       
      //Andaaz Apna Apna, Hera Pheri, Chupke Chupke, Jane Bhi Do Yaaro, Paadosan
      const gptMovies=gptResults.choices?.[0]?.message?.content.split(","); //split will provide the array of movies separated with comma

      //[Andaaz Apna Apna, Hera Pheri, Chupke Chupke, Jane Bhi Do Yaaro, Paadosan]

//For each movie i will search TMDB API

   const promiseArray =gptMovies.map((movie)=>searchMovieTMDB(movie));

//promiseArray will be promise that get from above line for each movies ,5 promises return.
//to get data from promises

const tmdbResults=await Promise.all(promiseArray);

//console.log("final result");

dispatch(addGptMovieResult({movieNames :gptMovies,movieResults: tmdbResults}));

     };



  return (
    <div className='pt-[30%] md:pt-[10%] flex justify-center'>

     <form className='w-full md:w-1/2 bg-black grid grid-cols-12 ' onSubmit={(e)=>e.preventDefault()}>

      <input ref={searchText} type="text" className='p-4 m-4 col-span-9' 
      placeholder={lang[langKey].gptSearchPlaceholder}/> 

      <button className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>
        {lang[langKey].search}
        </button>

     </form>



    </div>
  )
};

export default GptSearchBar;