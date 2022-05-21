import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../style/AddHotel.css";
import { v4 as uuidv4 } from 'uuid';

export default class AddHotel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      hotelName: "",
      submitNewHotel: false,
      error: false
    }
  }

  onChange = (e) => {
    this.setState({hotelName: e.target.value})
  }

  setNewHotel = () => {
    if(this.state.hotelName === "") {
      return this.setState({error: true})
    }
    let hotels = JSON.parse(localStorage.getItem('hotels')) || [];
    if(hotels?.length > 0) {
      hotels.unshift({
        id: uuidv4(),
        name: this.state.hotelName,
        score: 0,
      })
    }
    else {
      hotels.push({
        id: uuidv4(),
        name: this.state.hotelName,
        score: 0,
      })
    }
    localStorage.setItem('hotels', JSON.stringify(hotels));
    this.setState({submitNewHotel: true, error: false})
  }

  render() {
    const {submitNewHotel, error} = this.state
    return (
      <div className='add-hotel'>
        <Link style={{textDecoration: "none"}} to="/"><div className='back-button'>{"< Back"}</div></Link>
        <label className='input-label'>Otel Adı</label>
        <input onChange={this.onChange} className='hotel-input' type="text"></input>
       {error && <span className='error-text'>Lütfen otel adını boş bırakmayınız</span>}
       {submitNewHotel ?  <div className='success-add-button'>Eklendi</div> :  <div onClick={this.setNewHotel} className='add-button'>Ekle</div>}
      </div>
    )
  }
}
