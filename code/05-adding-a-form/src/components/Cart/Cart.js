import React, { useContext } from 'react'
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem' ;
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`
    const hasItems =  totalAmount > 0
    const cartItemRemoveHandler = (id) => {
     console.log(id)
    };
    const cartItemAddHandler = (item) => {}; 

    const cartItems = 
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => 
          <CartItem 
          key={item.id} 
          name={item.name} 
          price={item.price} 
          amount={item.amount} 
          // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
          onRemove={cartItemRemoveHandler.bind(null,item.id)} 
          onAdd={cartItemAddHandler.bind(null,item)} />)}</ul>
  return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}€</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {/* Si il y le prix est supérieur a 0 on affiche le btn order  */}
            {hasItems && <button className={classes.button}>Order</button> }
        </div>
    </Modal>
  )
}

export default Cart