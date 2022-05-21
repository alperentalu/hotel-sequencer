import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../style/AddHotel.css"

export default class AddHotel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      hotelName: "",
      submitNewHotel: false
    }
  }

  onChange = (e) => {
    this.setState({hotelName: e.target.value})
  }

  setNewHotel = () => {
    let hotels = JSON.parse(localStorage.getItem('hotels'));
    hotels.unshift({
      id: hotels.length +1,
      name: this.state.hotelName,
      score: 0,
    })
    console.log(hotels);
    // get localstorage 
    // add localstorage
    //last in first out
    // set state submitNewHotel : true
  }

  render() {
    const {submitNewHotel} = this.state
    return (
      <div className='add-hotel'>
        <Link style={{textDecoration: "none"}} to="/"><div className='back-button'>{"< Back"}</div></Link>
        <label className='input-label'>Otel Adı</label>
        <input onChange={this.onChange} className='hotel-input' type="text"></input>
       {submitNewHotel ?  <div className='add-button'>Eklendi</div> :  <div onClick={this.setNewHotel} className='add-button'>Ekle</div>}
      </div>
    )
  }
}
