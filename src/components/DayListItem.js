import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classNames(
    'day-list__item',
    !props.spots && 'day-list__item--full',
    props.selected && 'day-list__item--selected',
  )

  function spotsRemaining() {
    return (!props.spots ? 'no spots remaining' : props.spots === 1 ? '1 spot remaining' : `${props.spots} spots remaining` )
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining()}</h3>
    </li>
  );
}