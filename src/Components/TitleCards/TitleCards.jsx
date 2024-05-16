import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import Cards_data from "../../assets/cards/Cards_data";
import useMovieData from "../../hooks/useMovieData";

const TitleCards = ({ title, catagory }) => {
  const appiData = useMovieData(catagory);
  const cardRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };
  console.log(catagory);
  useEffect(() => {
    cardRef.current.addEventListener("wheel", handleWheel);
    return () => {
      cardRef.current.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {appiData.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt="movie image"
              />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
