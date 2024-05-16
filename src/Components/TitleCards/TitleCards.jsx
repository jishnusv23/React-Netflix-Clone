import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useMovieData from "../../hooks/useMovieData";
import "./TitleCards.css";

const TitleCards = ({ title, catagory }) => {
  const appiData = useMovieData(catagory);
  const cardRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardRef.current.addEventListener("wheel", handleWheel);
    return () => {
      cardRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {appiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt="movie image"
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
