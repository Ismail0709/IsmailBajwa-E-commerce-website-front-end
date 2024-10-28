import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
    setSuccess(''); // Clear success message on change
  };

  const handleSubscribe = async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        // Check if the response was successful
        if (response.ok) {
          setSuccess(data.message || 'Thank you for subscribing!');
          setEmail(''); // Clear the input after successful subscription
        } else {
          setError(data.error || 'Subscription failed. Please try again later.');
        }
      } else {
        setError('Subscription failed. Response was not JSON.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers through Email</h1>
      <p>Subscribe to our newsletter to stay updated</p>
      <form onSubmit={handleSubscribe}>
        <div>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Subscribe</button>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default NewsLetter;
