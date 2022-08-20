import Popup from "reactjs-popup";
import React from "react";
import "./GiftPopup.css";
import RightChevron from "../assets/chevron.png";

const contentStyle = {
  borderRadius: "4px",
  boxShadow: "2px 4px 8px #2a2a2a",
  width: "80%",
};

class GiftPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalSelected: false,
      onSubmitError: false,
      submitErrorText: "",
    };
  }

  redirectToPay = (e) => {
    if (this.state.goalAmount < 50) {
      this.setState({ onSubmitError: true });
      this.setState({ submitErrorText: "Amount too less." });
    } else {
      this.setState({ onSubmitError: false });
      var body = {
        goal_id: this.state.goalId,
        amount: this.state.goalAmount,
      };

      try {
        fetch("/payment-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .catch((e) => {
            console.error("Error in JSON parsing. " + e);
          })
          .then((resp) => {
            if (
              resp === undefined ||
              resp.payment_url === undefined ||
              resp == "Error"
            ) {
              this.setState({ onSubmitError: true });
              this.setState({ submitErrorText: "Oops, Something went wrong." });
            } else {
              window.location = resp.payment_url;
            }
          });
      } catch (error) {
        this.setState({ onSubmitError: true });
        this.setState({ submitErrorText: "Oops, Something went wrong." });
      }
    }
    e.preventDefault();
  };

  setSelectedGoal = (goalId, goalName) => {
    this.setState({ goalSelected: true, goalId: goalId, goalName: goalName });
  };

  resetGoalSelection = () => {
    this.setState({ goalSelected: false, onSubmitError: false });
  };

  setGoalAmount = (event) => {
    const goalAmount = event.target.value;
    this.setState({ goalAmount: goalAmount });
  };

  renderGoalnames = () => {
    const { eventDetails } = this.props;

    if (eventDetails != null && eventDetails.goals_details != null) {
      const goalsDetails = eventDetails.goals_details;

      const goalNames = goalsDetails.map((goal) => {
        return (
          <div key={goal.id + "-wrapper"}>
            <div
              className="Goal-Name"
              key={goal.id}
              onClick={() => this.setSelectedGoal(goal.id, goal.name)}
            >
              <span>{goal.name}</span>
              <img src={RightChevron} className="Goal-Name-chevron"></img>
            </div>
            <div className="Goal-Name-divider" />
          </div>
        );
      });

      return goalNames;
    } else {
      return null;
    }
  };

  render() {
    const goalNames = this.renderGoalnames();
    return (
      <div className="Gift-Popup-main">
        <Popup
          trigger={this.props.trigger}
          position="right center"
          modal
          onClose={this.resetGoalSelection}
          contentStyle={contentStyle}
        >
          {this.state.goalSelected ? (
            <>
              <div className="Header"> Enter Amount</div>
              <form className="Amount-form" onSubmit={this.redirectToPay}>
                <input
                  type="text"
                  id="amount"
                  placeholder="Amount"
                  onChange={this.setGoalAmount}
                />

                {this.state.onSubmitError ? (
                  <p className="Submit-error-text">
                    {this.state.submitErrorText}
                  </p>
                ) : (
                  <></>
                )}

                <input type="submit" value="SUBMIT" />
              </form>
            </>
          ) : (
            <>
              <div className="Header"> Select A Goal</div>
              <div>{goalNames}</div>
            </>
          )}
        </Popup>
      </div>
    );
  }
}

export default GiftPopup;
