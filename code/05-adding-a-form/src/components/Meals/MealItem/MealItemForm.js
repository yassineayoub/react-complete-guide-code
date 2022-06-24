import { useRef, useState } from 'react';
import React from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => { 
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    //Le + permet de convertir directement en nombre
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    // On passe un props nommée onAddTocart qui pourra etre appelé dans la balise du component MealItemForm 
    //on ne fait pas la logic ici car nous n'avons que amount
    //il contiendra le amount. ( in MealItem )
    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
    {/* pour utiliser useRef sur un "Custom Component" on doit appliquer React.forwardRef() dans le compo. */}
      <Input
      ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
