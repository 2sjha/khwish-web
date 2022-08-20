import React from "react";
import "./Home.css";
import KhwishCard from "../../components/KhwishCard";
import GiftIcon from "../../assets/gift.png";
import GooglePlayBadge from "../../assets/google-play-badge.png";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <div className="Home-main">
      <KhwishCard>
        <br />
        <br />
        <br />
        <br />

        <div className="Home-gift-icon-container">
          <img src={GiftIcon} alt="event" className="Home-Gift-icon" />
        </div>

        <h1 className="Home-Khwish-card-header">KHWISH</h1>

        <CardContent>
          <Typography
            className="Home-Khwish-card-text"
            variant="subtitle2"
            align="center"
          >
            Use Khwish App to create Events and collect gift and contributions
            in a smart way.
          </Typography>
        </CardContent>
      </KhwishCard>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="Google-Play-image-container">
        <a href="https://play.google.com/store/apps/details?id=com.khwish.app">
          <img
            alt="Get it on Google Play"
            src={GooglePlayBadge}
            className="Google-Play-image"
            align="center"
          />
        </a>
      </div>
    </div>
  );
}

export default Home;
