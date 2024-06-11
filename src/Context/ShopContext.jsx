import React, {createContext, useState} from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);

const DefaultCart = ()=>{
    let cart ={};
    for(let i=0; i<all_product.length; i++){
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
    const[cartItems, setCartItems] = useState(DefaultCart());
    
    const addToCart = (itemID)=>{
        setCartItems((prev)=> ({...prev, [itemID]: prev[itemID]+1}));
        console.log(cartItems);
    }

    const deleteFromCart = (itemID)=>{
        setCartItems((prev)=> ({...prev, [itemID]: prev[itemID]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(let item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }  
        }
        console.log(totalAmount);
        return totalAmount;
    }

    const contextValue = {all_product, cartItems, addToCart, deleteFromCart, getTotalCartAmount};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;