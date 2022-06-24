import React from 'react';
import classes from './Input.module.css';

//https://fr.reactjs.org/docs/hooks-reference.html#useref
//UseRef info
/*
 * forwardRef permet de transmettre directement la ref dans un autre component( et ainsi acceder au valeur de l'input)
 * l'objet à une propriété current .
 * 
 */
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
