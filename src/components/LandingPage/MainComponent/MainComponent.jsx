import React from 'react'
import Button from "../../Common/Button/Button";
import iphone from "../../../assets/iphone.png"
import gradient from "../../../assets/gradient.png"
import "./style.css";

const MainComponent = () => {
  return (
    <div className='flex-info'>
      <div className='left-component'>
        <h1 className='track-crypto-heading'>Track Crypto</h1>
        <h1 className='real-time-heading'>Real Time</h1>
        <p className="info-text">
          Track crypto through a public api in real time . Visit the dashboard to do so!
        </p>
        <div className='btn-flex'>
          <Button text={ "Dashboards "} />
          <Button text={ "Share "} outlined={true} />
        </div>
      </div>
      <div className='phone-container'>
        <img src={iphone} alt="Iphone Image" className='iphone-img'/>
        <img src={gradient} alt="Gradient-Img" className='gradient-img'/>
      </div>
    </div>
  )
}

export default MainComponent
