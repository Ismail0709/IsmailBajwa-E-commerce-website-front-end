import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Cancel.css';
import cancel from '../Components/Assets/error.png';

function Cancel() {
  return (
    <div className="payment-cancel-main">
          <div className='payment-cancel-container'>
            <img className='payment-cancel-image' src={cancel} alt="" />
            <h1 className='payment-cancel-title'>Payment Cancelled</h1>
            <div className='payment-cancel-details'>
              <p>Your payment has been cancelled.</p>
              <p>If you wish to try again, please return to your cart.</p>
            </div>
            <div className='paymentbutton-cancel-container'>
              <Link to="/cart">
                <button className='payment-cancel-button'>Go to Cart</button>
              </Link>
            </div>
            
          </div>
    </div>
  );
}

export default Cancel

/*
<div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: 'red' }}>Payment Cancelled</h1>
        <p>Your payment has been cancelled.</p>
        <p>If you wish to try again, please return to your cart.</p>
        <Link to="/cart">
            <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Cart</button>
        </Link>
        <p>Or <Link to="/">go back to the homepage</Link>.</p>
    </div>
*/