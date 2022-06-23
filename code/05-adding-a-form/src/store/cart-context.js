import React from "react";


/***
 * /// USE CONTEXT INFO ///
 * Généralement on nomme le fichier context comme ceci : name-context.js
 * Ensuite il faut créer un Provider de ce Context
 * *<CartContext.Provider>{props.children}</ CartContext.Provider>
 * Tout les Components compris entre ces 2 balises auront accès au Context , ici CartContext.
 * 
 * 
 */
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

export default CartContext