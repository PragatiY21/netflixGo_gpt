import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
 
    const dispatch =useDispatch();
    const trailerVideo = useSelector(store=>store.movies.trailerVideo);

  //  const [trailerId,setTrailerId] =useState(null);
    //fetch the trailer video by api call && updating the store with trailer video data
const getMovieVideos=async()=>
  {
const data =await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US", API_OPTIONS);
const json=await data.json();
//console.log("json",json);
//'https://api.themoviedb.org/3/movie/" +movieId+"/videos?language=en-US'
const filterData= json.results.filter((video)=>video.type==="Trailer");
const trailer= filterData.length ?filterData[0] : json.results[0];

//console.log("trailer",trailer);
//setTrailerId(trailer.key);
dispatch(addTrailerVideo(trailer))

};


useEffect(()=>{

  !trailerVideo && getMovieVideos();


},[]);



}

export default useMovieTrailer;