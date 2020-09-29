import React from "react";

import "components/Button.scss";

const classNames = require('classnames');

export default function Button(props) {

   // Button label
   const buttonLabel = props.children

   const buttonClasses = classNames(
      'button',
      props.danger && 'button--danger',
      props.confirm && 'button--confirm',
      )
 
   return (
      <button
         className={buttonClasses}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {buttonLabel}
      </button>
   );
 }
