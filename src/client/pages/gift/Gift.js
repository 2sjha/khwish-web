import React from "react";
import "./Gift.css";
import KhwishPatternImage from "../../assets/blue_pattern.svg";
import GiftImage from "../../assets/gift.svg";
import GiftPopup from "../../components/GiftPopup";
import { LinearProgress, CircularProgress, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "#005CB9",
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#005CB9",
  },
})(LinearProgress);

const ContributeButton = withStyles({
  root: {
    backgroundColor: "#005CB9",
    borderRadius: "40px",
    maxHeight: "90px",
    maxWidth: "200px",
    padding: "4px",
    "&:hover": {
      backgroundColor: blue[800],
    },
  },
})(Button);

class Gift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventDetails: {},
      errorRedirect: false,
    };
  }

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

    const eventId = params["event-id"];

    if (eventId === undefined) {
      this.setState({ loading: false, errorRedirect: true });
    } else {
      this.getEventDetails(eventId);
    }
  }

  getEventDetails = (eventId) => {
    fetch("/event-details?event-id=" + eventId)
      .then((res) => res.json())
      .catch((e) => {
        console.error("Error in JSON parsing. " + e);
      })
      .then((resp) => {
        if (resp == undefined || resp.success == false) {
          this.setState({ loading: false, errorRedirect: true });
        } else {
          this.setState({ loading: false, eventDetails: resp });
        }
      });
  };

  getEventDate = (eventDetails) => {
    if (eventDetails == null || eventDetails.event_date == null) {
      return "Event Date not set.";
    } else {
      console.log(eventDetails.event_date);
      let eventDate = new Date(eventDetails.event_date * 1000);
      return eventDate.toDateString();
    }
  };

  renderGoalCards = () => {
    var goals = this.state.eventDetails.goals_details;
    if (goals === undefined) {
      return <div className="No-goals-container">No Goals.</div>;
    }

    const goalCards = goals.map((goal) => {
      var collectedAmount = goal.collected_amount;
      var totalAmount = goal.total_amount;

      var barGoalProgress = 0;
      var goalPercentage = 0;

      if (collectedAmount === 0 || collectedAmount === undefined) {
        barGoalProgress = 3;
        goalPercentage = 0;
      } else if (totalAmount === 0 || totalAmount === undefined) {
        barGoalProgress = 100;
        goalPercentage = 100;
      } else if (collectedAmount > totalAmount) {
        barGoalProgress = 100;
        goalPercentage = (collectedAmount / totalAmount) * 100;
      } else {
        barGoalProgress = (collectedAmount / totalAmount) * 100;
        goalPercentage = (collectedAmount / totalAmount) * 100;
      }

      return (
        <li key={goal.id}>
          <div className="Goal-card">
            <div className="Goal-Event-Details-container">
              <p className="Goal-card-title">{goal.name}</p>
              <p className="Goal-card-desc">{goal.description}</p>
            </div>

            <BorderLinearProgress
              className="Goal-card-progressbar"
              variant="determinate"
              value={barGoalProgress}
              height="4px"
              thickness={8}
            />

            <div className="Goal-card-amount-details-container">
              <p className="Goal-card-amount">
                $ {collectedAmount}/{totalAmount}
              </p>

              <p className="Goal-card-percentage">
                {goalPercentage === undefined ? 0 : goalPercentage.toFixed(2)} %
              </p>
            </div>
          </div>
        </li>
      );
    });

    return <ul className="Goal-card-list">{goalCards}</ul>;
  };

  render() {
    const { eventDetails, loading, errorRedirect } = this.state;
    const goalCards = this.renderGoalCards();

    return loading ? (
      <div className="Loading-container">
        <CircularProgress className="Loading-progressbar" />
        <p className="Loading-text">Loading</p>
      </div>
    ) : errorRedirect ? (
      <Navigate to="/error" replace />
    ) : (
      <div className="Gift-main">
        <div className="Event-image-container">
          <img src={KhwishPatternImage} alt="event" className="Event-image" />
          <h1 className="Event-image-text">KHWISH</h1>
        </div>

        <div className="Event-Details-container">
          {/* <div className="Event-header-contribute-container"> */}
            <h1 className="Event-title">{eventDetails.name}</h1>
            <p className="Event-date">{this.getEventDate(eventDetails)}</p>
            {/* TODO Add event location here */}
            {/* <p className="Event-location">my birthday party at Ritz Carlton, Banglore</p> */}

            <div className="Contribute-button-container">
              <GiftPopup
                trigger={
                  <ContributeButton
                    variant="contained"
                    color="primary"
                    onClick={() => this.redirectToEvent()}
                  >
                    <img src={GiftImage} className="Gift-icon" alt="gift"></img>
                    <span className="Contribute-button-text">CONTRIBUTE</span>
                  </ContributeButton>
                }
                eventDetails={eventDetails}
              />
            {/* </div> */}
          </div>

          <div className="Event-description">
            <p>{eventDetails.description}</p>
          </div>

          <div className="Goals-rectangle-container">
            <div className="Goals-rectangle">Goals</div>
          </div>

          <hr className="Line-divider" size="1"></hr>

          <div className="Goal-cards-container">{goalCards}</div>
          <br />
        </div>
      </div>
    );
  }
}
export default Gift;
