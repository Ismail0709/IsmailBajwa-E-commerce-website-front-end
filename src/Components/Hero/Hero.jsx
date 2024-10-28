import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_icon from '../Assets/hero_image.png';

const Hero = () => {

  const navigate = useNavigate();

  const goToNewCollections = () => {
    navigate('/mens');
  };

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
            <div className="hero-hand-icon">
                <p>New</p>
                <img src={hand_icon} alt='hand-icon'/>
            </div>
            <p>Collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-button" onClick={goToNewCollections} style={{ cursor: 'pointer' }}>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_icon} alt="" />
      </div>
    </div>
  )
}

export default Hero
