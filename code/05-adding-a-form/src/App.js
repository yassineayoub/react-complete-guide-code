import {  useContext, useState } from 'react';
import Cart from './components/Cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartContext from './store/cart-context';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const shownCartHandler = () => {
    setCartIsShown(true)
  };
  const hideCartHandler = () => {
    setCartIsShown(false)
  };
  

  return (
    <CartProvider>
    { cartIsShown && <Cart onClose={hideCartHandler}/> }
      <Header onShowCart={shownCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
