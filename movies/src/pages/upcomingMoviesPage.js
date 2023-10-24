import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
//New Imports
import Spinner from '../components/spinner';
import {useQuery} from 'react-query';


const HomePage = (props) => {
  /*
  const [movies, setMovies] = useState([]);
  //Old Code - Entirely Deprecated
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);
  */

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  return (
    <PageTemplate
      title='Upcoming'
      movies={movies}
      //selectFavorite={addToFavorites} //Old code

      //Week 7 - Exercise 1
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}

    />
  );
};
export default HomePage;