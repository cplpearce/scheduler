// I M P O R T   R E A C T
import React from "react";
// I M P O R T   C O M P O N E N T S
import 'components/Appointment/styles.scss';
import Confirm from 'components/Appointment/Confirm'
import Empty from 'components/Appointment/Empty'
import Error from 'components/Appointment/Error'
import Form from 'components/Appointment/Form'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Status from 'components/Appointment/Status'

// I M P O R T   F U N C T I O N shouldComponentUpdate(nextProps, nextState)
import useVisualMode from 'hooks/useVisualMode'

// const classNames = require('classnames');

export default function Appointments(props) {

  // M O D E   C O N S T A N T S
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = 'CREATE'
  
  // C U S T O M   H O O K
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // R E N D E R   A P P O I N T M E N T S
  return (
    <article className="appointment">
      <Header time={ props.time } />
      { mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} /> 
      }
      { mode === CREATE && 
        <Form onCancel={back} interviewers={ props.interviewers }></Form> 
      }
      { mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      }
    </article>
  )
}