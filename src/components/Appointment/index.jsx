// I M P O R T   R E A C T
import React from "react";
// I M P O R T   C O M P O N E N T S
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
// I M P O R T   F U N C T I O N shouldComponentUpdate(nextProps, nextState)
import useVisualMode from 'hooks/useVisualMode'

// const classNames = require('classnames');

export default function Appointments(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  )
}