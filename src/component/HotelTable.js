import React, { Component } from "react";
import "../style/HotelTable.css";
import { Link } from "react-router-dom";
import hotelImage from "../images/Hotel-PNG.png"
let hotels =[];

export default class HotelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalHotels: hotels.length,
      activeHotelList: [],
      cardIsHover: null,
      selectedSort: null,
      openPopup: false
    };
  }

  componentDidMount() {
   this.getActiveHotelList(this.state.activePage);
   hotels = JSON.parse(localStorage.getItem("hotels"))
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

  openDeletePopup = (index, item) => {
    console.log(item)
    this.setState({openPopup: true, selectedHotel: item})
  }

  deleteHotel = (selectedHotel) => {
    hotels = hotels.filter((item, index) =>  item.id !== selectedHotel.id);
    this.getActiveHotelList(this.state.activePage);
    this.setState({selectedHotel: [], openPopup: false})
  }

  renderHotels = () => {
    const {activeHotelList, cardIsHover} = this.state;
    return (
      <>
        {activeHotelList.map((item, index) => {
          return (
            <div onMouseLeave={() => {this.setState({cardIsHover: null})}} onMouseEnter={() => {this.setState({cardIsHover: index})}} key={index} className="hotel-card">
              {cardIsHover === index && <div onClick={() => this.openDeletePopup(index, item)} className="delete-button">X</div>}
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
    const {selectedSort, openPopup,selectedHotel} = this.state
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
      {openPopup && <div className="popup-container"> <div className="popup-item">
        <div onClick={() => {this.setState({selectedHotel: [], openPopup: false})}} className="close-popup">X</div>
        <div className="popup-title">Oteli Sil</div>
        <div><span style={{fontWeight: 'bold'}}>{selectedHotel.name}</span>'i silmek istediğinizden emin misiniz ?</div>
        <div className="popup-buttons">
          <div onClick={() => {this.deleteHotel(selectedHotel)}} className="popup-delete-button">Oteli Sil</div>
          <div onClick={() => {this.setState({selectedHotel: [], openPopup: false})}} className="popup-cancel-button">Vazgeç</div>
        </div>
        </div> 
        </div>}
      </div>;
  }
}
