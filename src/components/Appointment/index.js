import React from "react";

// S C S S   I M P O R T
import "components/Appointment/styles.scss";

// C O M P O N E N T   I M P O R T S
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Status from "./Status";

// D E C L A R E D   T O   A I D   S T A T I C   T E S T I N G
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDITING = "EDITING";
const CONFIRMING = "CONFIRMING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// A P P O I N T M E N T   C O M P O N E N T
export default function Appointment(props) {
  // console.log(props);
  // S A V E
  function save(name, interviewer) {
    transition(SAVING);
    // create interview obj
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // D E L E T E   A P P O I N T M E N T
  function deleting() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  // E D I T
  function edit() {
    transition(EDITING);
  }
  // C O N F I R M
  function confirmation() {
    transition(CONFIRMING);
  }
  // D E F A U L T   T O   S H O W   I F   N O    I N T E R V I E W
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {/* N O    A P P O I N T M E N T */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      {/* B O O K E D   A P P O I N T M E N T */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirmation()}
          onEdit={() => {
            edit();
          }}
        />
      )}
      {/* C R E A T E   A P P O I N T M E N T */}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {/* S A V I N G... */}
      {mode === SAVING && <Status message="Saving Appointment..." />}
      {/* D E L E T I N G... */}
      {mode === DELETING && <Status message="Deleting Appointment..." />}
      {/* C O N F I R M   D E L E T E */}
      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={back}
          message={`Are you sure?  This will make ${props.interview.interviewer.name} sad.`}
        />
      )}
      {/* E D I T I N G   A N   A P P O I N T M E N T */}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {/* E R R O R   O N   S A V E */}
      {mode === ERROR_SAVE && (
        <Error
          message="There was a massive error, the server might be on fire."
          onClose={back}
        />
      )}
      {/* E R R O R   O N   D E L E T E */}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment, someone unplugged the router."
          onClose={back}
        />
      )}
    </article>
  );
}
