import React from "react";
import "./Home.css";
import KhwishCard from "../../components/KhwishCard";
import KhwishIcon from "../../assets/khwish-icon.png";
import GitHubBadge from "../../assets/github-badge.png";
import { Link } from "react-router-dom";
import { Button, CardContent } from "@mui/material";
import { withStyles } from "@mui/styles";

const TestButton = withStyles({
  root: {
    backgroundColor: "#4c6fd6",
    borderRadius: "5px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#587ef0",
    },
  },
})(Button);

class Home extends React.Component {

  render() {
    return (
      <div className="Home-main">
        <KhwishCard>
          <br />

          <div className="Home-khwish-icon-container">
            <img src={KhwishIcon} alt="event" className="Home-Khwish-icon" />
          </div>
          <a href="https://gist.github.com/2sjha/b9012f396290bf3b8ebfc2b89fcd01c4" style={{textDecoration: "none"}}>
            <h2 className="Home-Khwish-card-header">KHWISH</h2>
          </a>

          <CardContent>
            <p className="Home-Khwish-card-text">
              Use Khwish App to create Events and collect gift and contributions
              in a smart way. <br /> <br /> You can share those events with your friends, and they can contribute using this website.
            </p>
          </CardContent>
        </KhwishCard>

        <div className="Sample-flow-button-container">
          <TestButton className="Sample-flow-button" variant="contained" >
              How this works
          </TestButton>
        </div>

        <div className="Footer-container">
          <div className="Github-image-container">
            <a href="https://www.github.com/2sjha/khwish-app" style={{textDecoration: "none"}}>
              <img
                alt="Check the Khwish App on Github"
                src={GitHubBadge}
                className="Github-image"
                align="center"
              />
              <p className="Github-text">Check the Khwish App on Github</p>
            </a>
          </div>
        </div>
      </div >
    );
  }
}

export default Home;
