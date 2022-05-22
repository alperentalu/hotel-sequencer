import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/AddHotel.css";
import { v4 as uuidv4 } from "uuid";

export default class AddHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelName: "",
      submitNewHotel: false,
      error: false,
    };
  }

  onChange = (e) => {
    this.setState({ hotelName: e.target.value });
  };

  setNewHotel = () => {
    if (this.state.hotelName === "") {
      return this.setState({ error: true });
    }
    let hotels = JSON.parse(localStorage.getItem("hotels")) || [];
    if (hotels?.length > 0) {
      hotels.unshift({
        id: uuidv4(),
        name: this.state.hotelName,
        score: 0,
      });
    } else {
      hotels.push({
        id: uuidv4(),
        name: this.state.hotelName,
        score: 0,
      });
    }
    localStorage.setItem("hotels", JSON.stringify(hotels));
    this.setState({ submitNewHotel: true, error: false });
  };

  render() {
    const { submitNewHotel, error } = this.state;
    return (
      <div className="add-hotel">
        <Link style={{ textDecoration: "none" }} to="/">
          <div className="back-button">{"< Back"}</div>
        </Link>
        <div className="input-container">
          <label className="input-label">Hotel Name</label>
          <input
            onChange={this.onChange}
            className="hotel-input"
            type="text"
          ></input>
          {error && (
            <span className="error-text">
              You should be fill this field
            </span>
          )}
        </div>
        {submitNewHotel ? (
            <div className="success-add-button">Added</div>
          ) : (
            <div onClick={this.setNewHotel} className="add-button">
              Add
            </div>
          )}
      </div>
    );
  }
}
