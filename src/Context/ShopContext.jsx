import React, {createContext, useEffect, useState} from "react";

export const ShopContext = createContext(null);

const DefaultCart = ()=>{
    let cart ={};
    for(let i=0; i<300+1; i++){
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
    const[cartItems, setCartItems] = useState(DefaultCart());
    const[all_product, setAllProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8000/allProducts')
        .then((res)=> res.json())
        .then((data)=> setAllProducts(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/getCart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then((response)=>response.json())
            .then((data)=> setCartItems(data));

        }

    }, []);
    
    const addToCart = (itemID)=>{
        setCartItems((prev)=> ({...prev, [itemID]: prev[itemID]+1}));
        //console.log(cartItems);
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/addToCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'itemID': itemID})
            })
            .then((res)=> res.json())
            .then((data)=> console.log(data))
        }
    }

    const deleteFromCart = (itemID)=>{
        setCartItems((prev)=> ({...prev, [itemID]: prev[itemID]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8000/removeFromCart')
        }
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