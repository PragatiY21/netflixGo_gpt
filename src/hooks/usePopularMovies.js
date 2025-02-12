import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {  addPopularMovies } from '../utils/moviesSlice'
import { useEffect } from 'react'

const usePopularMovies =()=>{

      // fetch data from TMDB Api and update store
  const dispatch =useDispatch();
  const PopularMovies = useSelector(store=>store.movies.PopularMovies);


  const getPopularMovies = async()=>{
  
    const data =await fetch("https://api.themoviedb.org/3/movie/popular?page=1",API_OPTIONS);
    const json =await data.json();
    //console.log("json result ",json.results);
    dispatch(addPopularMovies(json.results));
  
  };
  
  useEffect(()=>{
  
    !PopularMovies &&  getPopularMovies();
   
  
  },[])
}

export default usePopularMovies;