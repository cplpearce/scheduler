import React from "react";

import "components/Button.scss";

import DayListItem from "./DayListItem"

export default function DayList(props){
  // Index is bad to use for keys
  const items = props.days.map((day, index) => {
    return <DayListItem 
      key={index}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay} 
    />
  });
  // Return numerous unordered list elements by the len of items
  return(
    <ul>
      {items}
    </ul>
  )
}
