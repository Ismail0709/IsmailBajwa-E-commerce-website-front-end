import React, { useContext } from 'react'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {
    const {cartItems, deleteFromCart, all_product, getTotalCartAmount} = useContext(ShopContext);

    const getStripe = () => {
      return new Promise((resolve) => {
          const stripe = window.Stripe(process.env.REACT_APP_KEY); // Replace with your Stripe publishable key
          resolve(stripe);
      });
  };

    const handleCheckout = async () => {
      const items = all_product
      .filter(e => cartItems[e.id] > 0)
      .map(e => ({
        name: e.name,
        image: e.image,
        new_price: e.new_price,
        quantity: cartItems[e.id],
      }));
      
      console.log("Items to send:", items);
      const token = localStorage.getItem('auth-token'); // Replace with your method of getting the token
    
      if (!token) {
        console.error("No authentication token found.");
        return; // Early return if token is not found
      }

      const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({ items }),
    });
    
    const textResponse = await response.text(); // Get raw response text
    console.log("Raw response:", textResponse); // Log it for debugging
    const session = JSON.parse(textResponse);
        console.log("Session response:", session);
        if (session.id) {
          const stripe = await getStripe(); // Initialize Stripe
          stripe.redirectToCheckout({ sessionId: session.id });
      } else {
          console.error("No session ID returned:", session);
      }
  };


  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0){
        return (<div key={e.id}>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitem-remove-icon' src={remove_icon} onClick={()=> deleteFromCart(e.id)} alt="" />
            </div>
            <hr />
        </div>);
    }
    return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-items">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems
