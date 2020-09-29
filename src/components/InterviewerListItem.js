import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const InterviewerItemClasses = classNames(
    'interviewers__item',
    props.selected && 'interviewers__item--selected'
    );
  const InterviewerItemImageClasses = classNames(
    'interviewers__item-image',
    );

  return (
    <li key={props.id} className={InterviewerItemClasses}>
      <img
        className={InterviewerItemImageClasses} 
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}