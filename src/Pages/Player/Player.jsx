import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import useVideoData from "../../hooks/useVideoData";

const Player = () => {
  const { movieId } = useParams();
  const Navigate = useNavigate();
  const { apiData } = useVideoData(movieId);
  console.log(movieId, "+godod");

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          Navigate("/");
        }}
      />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        frameBorder="0"
        title="trailer"
        className="responsive-iframe"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
