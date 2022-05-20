import React, { Component } from 'react'
import HotelTable from '../component/HotelTable'
import "../style/Home.css"

export default class Home extends Component {
  render() {
    return (
      <div className="container">
          <HotelTable/>
      </div>
    )
  }
}
