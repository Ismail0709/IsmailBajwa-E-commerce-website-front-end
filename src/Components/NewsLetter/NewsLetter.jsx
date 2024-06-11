import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers through Email</h1>
      <p>Subscribe to our newsletter to stay updated</p>
      <div>
        <input type="email" placeholder='Email'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
