import React from "react";
import "./Footer.css";
import facebook_icon from "../../assets/facebook_icon.png";
import insta_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import youtube_icon from "../../assets/youtube_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={facebook_icon} alt="" />
        <img src={insta_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={youtube_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Helpe Center </li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relation</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preference </li>
        <li>Corporate Information </li>
        <li>Contact Us</li>
      </ul>
      <p className="Copyright-text">@20202-202-22-2-2-2-2</p>
    </div>
  );
};

export default Footer;
