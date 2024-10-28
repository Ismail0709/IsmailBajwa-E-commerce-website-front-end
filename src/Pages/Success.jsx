import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CSS/Success.css';
import success from '../Components/Assets/success.png';
import { Link } from 'react-router-dom';

function Success() {
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);

    // Get session_id from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            // Fetch session details from your backend or directly from Stripe API
            fetch(`http://localhost:8000/payment-details?session_id=${sessionId}`)
                .then(response => response.json())
                .then(data => setSessionData(data))
                .catch(error => console.error('Error fetching session details:', error));
        }
    }, [sessionId]);

    return (
        <div className="payment-main">
          <div className='payment-container'>
            <img className='payment-image' src={success} alt="" />
            <h1 className='payment-title'>Payment Success!</h1>
            {sessionData ? (
                <div className='payment-details'>
                    <p className='heading'>Payment ID: <span className="highlight">{sessionData.id}</span></p>
                    <p className='heading'>Amount: $<span className="highlight">{sessionData.amount_total / 100}</span></p>
                    <p className='heading'>Status: <span className="highlight">{sessionData.status}</span></p>
                </div>
            ) : (
                <p style={{padding: 20, fontSize: 20}}>Loading payment details...</p>
            )}
            <div className='paymentbutton-container'>
              <Link to="/">
                <button className='payment-button'>Go to your Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
        
    );
}

export default Success;
