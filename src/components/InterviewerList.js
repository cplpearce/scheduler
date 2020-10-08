import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";

// I N T E R V I E W E R   L I S T   R E N D E R S
// T H E   A V A I L A B L E   I N T E R V I E W E R S
export default function InterviewerList(props) {
  let interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

// P R O P   T Y P E S   C H E C K I N G
InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired,
};
