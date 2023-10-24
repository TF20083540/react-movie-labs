import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage'
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
//import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddToPlaylistIcon from "../components/cardIcons/addToWatchlist";

const HomePage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  
  // Redundant, but necessary to avoid app crashing.
  const mustWatches = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatches', JSON.stringify(mustWatches))
  const addToMustWatches = (movieId) => true 
  

  return (
    <PageTemplate
      title="Upcoming"
      movies={movies}
      selectMustWatch={addToMustWatches} //Old code

      //Week 7 - Exercise 1
      action={(movie) => {
        //return <PlaylistAddIcon movie={movie} />
        return <AddToPlaylistIcon movie={movie} />

      }}

    />
  );
};
export default HomePage;