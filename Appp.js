import React, { useCallback, useEffect, useState } from "react";
import { Movie } from "./Movie";
export const Appp = () => {
  const [movies, setMovies] = useState([]);
  const [Loading, setloading] = useState(false);
  const [iserror, seterror] = useState(null);
  const [Cancel,setcancel]= useState(false);




  const Handlecancel=()=>{
    setcancel(!Loading);
  }

  const FetchMovieHandler=useCallback(async ()=> {
    setloading(true);
    seterror(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      const transformmovie = data.results.map((moviedata) => {
        return {
          id: moviedata.eposide_id,
          title: moviedata.title,
          opentext: moviedata.opening_crawl,
        };
      });
      setMovies(data.results);
     
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
      })

      useEffect(()=>{
        FetchMovieHandler();
      },[FetchMovieHandler])

  // console.log(movies)
  return (
    <>
      <div>
        <button onClick={FetchMovieHandler}>FetchData</button>
        <button onClick={Handlecancel}>Cancel</button>
        {!Loading && movies.length > 0 && <Movie movie={movies} />}
        {!Loading && movies.length === 0 &&  !iserror && <p>Movie not found</p>}
        {Loading && <p>Loading....</p>}

        {!Loading && <p>{iserror}</p>}
      </div>
    </>
  );
};
