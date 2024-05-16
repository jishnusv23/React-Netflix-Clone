import { useState, useEffect } from "react";
import axios from "axios";

const useVideoData = (movieId) => {
  console.log(movieId, "hooks");
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
    console.log("dfakdfdsk");
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      )
      .then((response) => {
        const result = response.data.results[0];
        console.log(result, "djdjjjjjjjjjjjjjj");
        if (result) {
          console.log("ghhggggggggggggggggggggggggggggggggg");
          setApiData({
            name: result.name,
            key: result.key,
            published_at: result.published_at,
            typeof: result.type,
          });
        } else {
          console.error("No video results found");
        }
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(apiData, "apidata");

  return { apiData };
};

export default useVideoData;
