import React from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  
  // const [item, setItem] = useReducer(itemReducer,{
  //   id: "",
  //   amount: ""
  // });
  const itemAddHandler = (e) => {
    
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    // const item = {
    //   id: input.id,
    //   amount: input.value
    // }
  }

  return (
    <form className={classes.form} onSubmit={itemAddHandler}>
      <Input
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
    </form>
  );
};

export default MealItemForm;
