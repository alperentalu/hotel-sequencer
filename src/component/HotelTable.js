import React, { Component } from "react";
import "../style/HotelTable.css";
import { Link } from "react-router-dom";
import hotelImage from "../images/Hotel-PNG.png"
let hotels = [
  {
    id: 0,
    name: "Maxx Royal",
    score: 9.5,
    img: "a",
  },
  {
    id: 1,
    name: "Suncity",
    score: 0.7,
    img: "b",
  },
  {
    id: 2,
    name: "Majesty",
    score: 4.5,
    img: "c",
  },
  {
    id: 3,
    name: "Majesty",
    score: 4.5,
    img: "c",
  },
  {
    id: 4,
    name: "Majesty",
    score: 4.5,
    img: "c",
  },
  {
    id: 5,
    name: "Majjjjesty",
    score: 4.5,
    img: "c",
  },
  {
    id: 0,
    name: "Maxx Royal",
    score: 9.5,
    img: "a",
  },
  {
    id: 1,
    name: "Suncity",
    score: 0.7,
    img: "b",
  },
  {
    id: 2,
    name: "2.sayfa",
    score: 4.5,
    img: "c",
  },
  {
    id: 3,
    name: "Majesty",
    score: 4.5,
    img: "c",
  },
  {
    id: 4,
    name: "3.sayfa",
    score: 4.5,
    img: "c",
  },
  {
    id: 5,
    name: "3.sayfa",
    score: 4.5,
    img: "c",
  },
];

export default class HotelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalHotels: hotels.length,
      activeHotelList: [],
      cardIsHover: null,
      selectedSort: null
    };
  }

  componentDidMount() {
   this.getActiveHotelList(this.state.activePage);
  }

  getActiveHotelList = (i) => {
    let activeHotelList = [];
    hotels.map((item,index) => {
        if( index >= (i-1) * 5 && index < (i * 5) ) {
          activeHotelList.push(item);
        }
    })
    this.setState({activeHotelList: activeHotelList})
  }

  changeActivePage = (i) => {
      this.setState({activePage: i});
      this.getActiveHotelList(i);
  }

  getPagination = () => {
      const {activePage, totalHotels} = this.state;
      let totalPage = Math.ceil(totalHotels / 5);
      return (
          <div className="pagination-container">
            <span onClick={() => {this.changeActivePage(1)}}>{"<"}</span>
              {hotels.map((item, index) => {
                   if (index % 5 === 0) {
                    return <span className="pagination-item" onClick={() => {this.changeActivePage((index / 5) +1)}} key={index}>{(index / 5) +1}</span>
                  }

              })}
            <span onClick={() => {this.changeActivePage((hotels.length / 5)+ 1)}}>{">"}</span>
          </div>
      )
  }

  deleteHotel = (i) => {
    hotels = hotels.filter((item, index) =>  index !== i);
    this.getActiveHotelList(this.state.activePage);
  }

  renderHotels = () => {
    return (
      <>
        {this.state.activeHotelList.map((item, index) => {
          return (
            <div onMouseLeave={() => {this.setState({cardIsHover: null})}} onMouseEnter={() => {this.setState({cardIsHover: index})}} key={index} className="hotel-card">
              {this.state.cardIsHover === index && <div onClick={() => this.deleteHotel(index)} className="delete-button">X</div>}
              <img className="image-container" src={hotelImage} alt="hotel" />
              <div className="info-container">
                <span>{item.name}</span>
                <span className="score-text">{`${item.score} Puan`}</span>
                <div className="button-container">
                  <div className="score-button">PUAN ARTIR</div>
                  <div className="score-button">PUAN AZALT</div>
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
    const {selectedSort} = this.state
    return <div className="hotel-list">
      <div className="add-hotel-container">
      <Link style={{textDecoration: "none"}} to="/add-hotel"> <div className="add-hotel-icon">+</div></Link>
        <div>OTEL EKLE</div>
      </div>
       <div style={{alignSelf: 'center'}}>
       <select>
          <option selected disabled value="a">Sıralama</option>
          <option value="artan">Puan (Artan)</option>
          <option value="azalan">Puan (Azalan)</option>
        </select>
       </div>
      {this.renderHotels()}
      </div>;
  }
}
