import React from "react";
import "./Thanks.css";

import GreenTick from "../../assets/green_tick.png";
import Cross from "../../assets/cross.png";
import GiftIcon from "../../assets/gift.svg";
import GooglePlayBadge from "../../assets/google-play-badge.png";
import { Button, CardContent, CardMedia, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Navigate, Link } from "react-router-dom";
import KhwishCard from "../../components/KhwishCard";
import { blue } from "@mui/material/colors";

const OKButton = withStyles({
  root: {
    backgroundColor: "#005CB9",
    borderRadius: "40px",
    maxHeight: "90px",
    maxWidth: "180px",
    width: "30%",
    "&:hover": {
      backgroundColor: blue[800],
    },
  },
})(Button);

class Thanks extends React.Component {
  constructor(props) {
    super(props);
    this.paymentSuccess = false;

    this.state = {
      goalName: "",
      creatorName: "",
      onSubmitError: 0,
      submitErrorText: "Working fine",
      eventId: "",
    };
  }

  fetchDetails = (goal_id) => {
    try {
      fetch("/thanks-details" + "?goal-id=" + goal_id, {})
        .then((res) => res.json())
        .catch((e) => {
          console.error("Error in JSON parsing. " + e);
        })
        .then((resp) => {
          if (resp == "Error" || resp == undefined) {
            this.setState({
              onSubmitError: true,
              submitErrorText: "Oops, Something went wrong.",
            });
          } else {
            this.setState({
              goalName: resp["goal_name"],
              creatorName: resp["event_creator_name"],
              eventId: resp["event_id"],
            });
          }
        });
    } catch (error) {
      this.setState({ onSubmitError: 1 });
      this.setState({ submitErrorText: "Oops, Something went wrong." });
    }
  };

  componentDidMount() {
    const { location } = this.props;
    let reqParamsStr = location.search;
    const params = {};
    reqParamsStr = reqParamsStr.substring(1);
    const reqParamsArr = reqParamsStr.split("&");

    for (let i = 0; i < reqParamsArr.length; i += 1) {
      const reqParam = reqParamsArr[i].split("=");
      const reqKey = reqParam[0];
      const reqValue = reqParam[1];

      params[reqKey] = reqValue;
    }

    const goalId = params["goal-id"];
    const paymentStatus = params["payment_status"];
    if (paymentStatus === "Credit") {
      this.paymentSuccess = true;
    }
    this.fetchDetails(goalId);
  }

  render() {
    return this.state.onSubmitError ? (
      <Navigate to="/error" replace />
    ) : (
      <div className="Thanks-main">
        <KhwishCard>
          <br />
          <br />
          <br />
          <br />

          <div className="Thanks-gift-icon-container">
            <img src={GiftIcon} alt="event" className="Thanks-Gift-icon" />
          </div>

          <h1 className="Thanks-Khwish-card-header">KHWISH</h1>

          <CardContent>
            <Typography
              className="Thanks-Khwish-card-text"
              variant="subtitle2"
              align="center"
            >
              Use Khwish App to create Events and collect gift and contributions
              in a smart way.
            </Typography>
          </CardContent>
        </KhwishCard>

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

        <br />

        <div>
          <CardContent>
            {this.paymentSuccess ? (
              <p className="Thanks-text">
                You have{" "}
                <span style={{ color: "green" }}>Successfully Contributed</span>{" "}
                towards {this.state.creatorName}'s goal {this.state.goalName}
              </p>
            ) : (
              <p className="Thanks-text">
                The <span style={{ color: "red" }}>Payment Failed</span> for
                your contribution towards {this.state.creatorName}'s goal{" "}
                {this.state.goalName}
              </p>
            )}
          </CardContent>

          <CardMedia className="Status-image-container">
            <div className="Status-image-container">
              {this.paymentSuccess ? (
                <img src={GreenTick} alt="event" className="Status-image" />
              ) : (
                <img src={Cross} alt="event" className="Status-image" />
              )}
            </div>
          </CardMedia>

          <CardContent>
            {this.paymentSuccess ? (
              <p className="Thanks-text">
                We have notified {this.state.creatorName} about your
                contribution. <br />
                Thank you for your interest in {this.state.creatorName}'s
                Community Funding Event.
              </p>
            ) : (
              <p className="Thanks-text">
                Thank you for your interest in {this.state.creatorName}'s
                Community Funding Event.
              </p>
            )}
          </CardContent>

          <div className="Thanks-OK-button-container">
            <Link to={"/gift?event-id=" + this.state.eventId}>
              <OKButton
                variant="contained"
                color="primary"
              >
                {this.paymentSuccess ? (
                  <span className="Thanks-OK-button-text">OK</span>
                ) : (
                  <span className="Thanks-OK-button-text">RETRY</span>
                )}
              </OKButton>
            </Link>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Thanks;
