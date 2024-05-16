import { useEffect, useState } from "react";

const useMovieData = (catagory) => {
  const [appiData, setApiData] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YThiZGM0MWE3MDFmZTkxZGJhM2JiMzg1ZjM1OTBjOSIsInN1YiI6IjY2NDRmNjkxMThjOWU1MDUxMWM1NDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I4ARu8V4_OwLz4gEcBm6LiPC6XMkWDpzOVUvJORjUao",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${
        catagory ? catagory : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
   
  }, [catagory]);
  return appiData
};
export default useMovieData;