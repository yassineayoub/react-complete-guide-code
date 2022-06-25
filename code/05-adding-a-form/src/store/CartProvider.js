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
        //on ajoute au totalAmount le prix de l'item x la quantitée
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        //On veut que si on ajoute un item dans le cart , s'il existe on ajoute 1 au amount au lieu d'ajouter une nouvelle ligne
        //findIndex va retourner l'index de l'item s'il existe dans l'array
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        
        // Si l'item existe dans state.items 
        if (existingCartItem) {
            let updatedItem;
            //on créer un objet updatedItem
            updatedItem = {
            //on le rempli avec ses ancienne valeurs
            ...existingCartItem,
            //on set l'amount = l'ancienne valeur + la quantitée entrée dans le form
            amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            //On écrase l'ancien item avec le nouveau
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // concat renvoi une nouvelle array comparé a push 
            //Si l'item n'existe pas déja, on l'ajoute directement
            updatedItems = state.items.concat(action.item)
        }
   
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id );
        const existingItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingItem.amount === 1) {
            //si en cliquand , l'amount === 1 alors on retourne une array où l'id en parametre de l'action n'est pas présent
            updatedItems = state.items.filter((item) => item.id !== action.id)
        } else {
            // on créer un nouvel item avec le spread opérator , on reprend tte les valeurs de l'objet 
            //En recréant l'objet on redéfini une de ses propriétée, ici on décrémente l'amount
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            //on créer une nouvelle array sur la base de l'ancienne et on l'overwrite en réinjectant l'item updated
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        let updatedTotalAmount = state.totalAmount - existingItem.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
        // console.log(cartItemIndex);
        // console.log(state.items)
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
        //La convention de nommage et de mettre en majuscule le type ( ou identifier , le nom est au choix )
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