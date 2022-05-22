import React, { Component } from "react";
import "../style/HotelTable.css";
import { Link } from "react-router-dom";
import hotel from "../images/hotel.png"
let hotels = [];

export default class HotelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalHotels: hotels?.length ? hotels.length : 0,
      activeHotelList: [],
      cardIsHover: null,
      selectedSort: null,
      openPopup: false,
    };
  }

  componentDidMount() {
    hotels = JSON.parse(localStorage.getItem("hotels"));
    if(hotels?.length > 0) {
      this.getActiveHotelList(this.state.activePage);
    }
  }

  sortBy = (e) => {
    if (e === "decreasing") {
      hotels.sort((a, b) => {
        return b.score - a.score;
      });
    }
    if (e === "increasing") {
      hotels.sort((a, b) => {
        return a.score - b.score;
      });
    }
    this.getActiveHotelList(this.state.activePage);
    this.renderHotels();
  };

  getActiveHotelList = (i) => {
    let activeHotelList = [];
    hotels.map((item, index) => {
      if (index >= (i - 1) * 5 && index < i * 5) {
        activeHotelList.push(item);
      }
    });
    this.setState({ activeHotelList: activeHotelList });
  };

  changeActivePage = (i) => {
    this.setState({ activePage: i });
    this.getActiveHotelList(i);
  };

  getPagination = () => {
    return (
      <div className="pagination-container">
        <span
          style={{cursor: 'pointer'}}
          onClick={() => {
            this.changeActivePage(1);
          }}
        >
          {"<"}
        </span>
        {hotels.map((item, index) => {
          if (index % 5 === 0) {
            return (
              <span
                className="pagination-item"
                onClick={() => {
                  this.changeActivePage((index / 5 )+ 1);
                }}
                key={index}
              >
                {index / 5 + 1}
              </span>
            );
          }
        })}
        <span
          style={{cursor: 'pointer'}}
          onClick={() => {
            this.changeActivePage(Math.round(hotels.length / 5 )+ 1);
          }}
        >
          {">"}
        </span>
      </div>
    );
  };

  openDeletePopup = (index, item) => {
    this.setState({ openPopup: true, selectedHotel: item });
  };

  deleteHotel = (selectedHotel) => {
    hotels = hotels.filter((item, index) => item.id !== selectedHotel.id);
    localStorage.setItem("hotels", JSON.stringify(hotels))
    this.getActiveHotelList(this.state.activePage);
    this.setState({ selectedHotel: [], openPopup: false });
  };

  increaseScore = (i) => {
    hotels.map((item) => {
      if (item.id === i.id) {
        if (item.score >= 9) {
          return;
        }
         item.score = item.score + 1;
      }
    });
    localStorage.setItem('hotels', JSON.stringify(hotels));
    this.getActiveHotelList(this.state.activePage);
    this.renderHotels();
  };

  decreaseScore = (i) => {
    hotels.map((item) => {
      if (item.id === i.id) {
        if (item.score === 0) {
          return;
        }
         item.score = item.score - 1 ;
      }
    });
    localStorage.setItem('hotels', JSON.stringify(hotels));
    this.getActiveHotelList(this.state.activePage);
    this.renderHotels();
  };

  renderHotels = () => {
    const { activeHotelList, cardIsHover } = this.state;
    return (
      <>
        {activeHotelList.map((item, index) => {
          return (
            <div
              onMouseLeave={() => {
                this.setState({ cardIsHover: null });
              }}
              onMouseEnter={() => {
                this.setState({ cardIsHover: index });
              }}
              key={index}
              className="hotel-card"
            >
              {cardIsHover === index && (
                <div
                  onClick={() => this.openDeletePopup(index, item)}
                  className="delete-button"
                >
                  X
                </div>
              )}
              <img className="image-container" src={hotel} alt="hotel" />
              <div className="info-container">
                <span className="hotel-name-text">{item.name}</span>
                <span className="score-text">{`${item.score} Puan`}</span>
                <div className="button-container">
                  <div
                    className="score-button"
                    onClick={() => {
                      this.increaseScore(item);
                    }}
                  >
                    PUAN ARTIR
                  </div>
                  <div
                    className="score-button"
                    onClick={() => {
                      this.decreaseScore(item);
                    }}
                  >
                    PUAN AZALT
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {this.getPagination()}
      </>
    );
  };
  render() {
    const { selectedSort, openPopup, selectedHotel } = this.state;
    return (
      <div className="hotel-list">
        <div className="add-hotel-container">
          <Link style={{ textDecoration: "none", marginRight: '1vw' }} to="/add-hotel">
            {" "}
            <div className="add-hotel-icon">+</div>
          </Link>
          <span>OTEL EKLE</span>
        </div>
        <div style={{ alignSelf: "center" }}>
          <select onChange={(e) => {this.sortBy(e.target.value)}}>
            <option selected disabled value="a">
              Sort
            </option>
            <option value="increasing">Score (Increase)</option>
            <option value="decreasing">Score (Decrease)</option>
          </select>
        </div>
        {hotels.length > 0 && this.renderHotels()}
        {openPopup && (
          <div className="popup-container">
            {" "}
            <div className="popup-item">
              <div
                onClick={() => {
                  this.setState({ selectedHotel: [], openPopup: false });
                }}
                className="close-popup"
              >
                X
              </div>
              <div className="popup-title">Delete Hotel</div>
              <div>
               Are u sure want to delete {" "}
                <span style={{ fontWeight: "bold" }}>{selectedHotel.name}</span> ?
              </div>
              <div className="popup-buttons">
                <div
                  onClick={() => {
                    this.deleteHotel(selectedHotel);
                  }}
                  className="popup-delete-button"
                >
                  Oteli Sil
                </div>
                <div
                  onClick={() => {
                    this.setState({ selectedHotel: [], openPopup: false });
                  }}
                  className="popup-cancel-button"
                >
                  Vazgeç
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
