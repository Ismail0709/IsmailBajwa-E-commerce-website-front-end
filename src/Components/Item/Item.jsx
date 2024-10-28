import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
      {/* <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link> */}
      {/* <img src={props.image} alt="" /> */}
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="items-prices">
        <div className="items-prices-new">
            ${props.new_price}
        </div>
        <div className="items-prices-old">
            ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
