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

// M O D E   C O N S T A N T S
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointments(props) {
  // C U S T O M   H O O K
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // S A V E   A P P O I N T M E N T
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW, true);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };
  // C A N C E L   B O O K I N G
  const cancel = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY, true);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  // R E N D E R   A P P O I N T M E N T S
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          interviewers={props.interviewers}
        ></Form>
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save!" onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete this appointment?"
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === ERROR_DELETE && (
        <Error message="Appointment could not be deleted." onClose={back} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => {
            back();
          }}
        />
      )}
    </article>
  );
}