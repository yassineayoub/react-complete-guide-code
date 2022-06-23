import React, { useReducer } from 'react'
import CartContext from './cart-context'

//On définit l'état initial du Cart qu'on va passer dans le hook useReducer 
const defaultCartState = {
    items: [],
    totalAmount: 0
}
// On défini ici le Reducer , en dehors de la function CartProvider car elle n'a pas besoin d'etre exectuée a chaque changement d'état de CartProvider
const cartReducer = (state,action) => {
    if (action.type === 'ADD') {
        // concat renvoi une nouvelle array comparé a push 
        const updatedItems = state.items.concat(action.item)
        //on ajoute au totalAmount le prix de l'item x la quantitée
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    return defaultCartState
}
/****
 * Use Context info
 * On créer un component qui va "wrapper" les autres component qui on besoin d'acceder au Context
 * 
 */
const CartProvider = (props) => {
    //Pour ajouter les items on va utiliser useReducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState)

    //fonction qui va ajouter un item dans le cartContext
    const addItemToCartHandler = item => {
        //La convention de nommage et de mettre en majuscule le type ( ou identifier , le nom est au choix)
        dispatchCartAction({type: 'ADD', item: item});
    };
    //handler qui va suppr un item
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    //cet objet doit refleter celui présent dans cart-context ( propriété )
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
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