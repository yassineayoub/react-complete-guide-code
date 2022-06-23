import React from 'react'
import CartContext from './cart-context'


/****
 * Use Context info
 * On créer un component qui va "wrapper" les autres component qui on besoin d'acceder au Context
 * 
 * 
 */
const CartProvider = (props) => {
    //fonction qui va ajouter un item dans le cartContext
    const addItemToCartHandler = item => {};
    //handler qui va suppr un item
    const removeItemFromCartHandler = id => {};

    //cet objet doit refleter celui présent dans cart-context ( propriété )
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider