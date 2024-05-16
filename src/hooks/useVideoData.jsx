import { useState, useEffect } from "react";

const useVideoData = (movieId) => {
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YThiZGM0MWE3MDFmZTkxZGJhM2JiMzg1ZjM1OTBjOSIsInN1YiI6IjY2NDRmNjkxMThjOWU1MDUxMWM1NDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I4ARu8V4_OwLz4gEcBm6LiPC6XMkWDpzOVUvJORjUao",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setApiData({
          name: response.results[0].name,
          key: response.results[0].key,
          published_at: response.results[0].published_at,
          typeof: response.results[0].type,
        })
      )
      .catch((err) => console.error(err));
  }, [movieId, options]);

  return { apiData };
};

export default useVideoData;
