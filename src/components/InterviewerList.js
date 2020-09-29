import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const items = props.interviewers.map((interviewer => {
    return <InterviewerListItem
      key={interviewer.key}
      name={interviewer.name}
      avatar={interviewer.avatar}
      />
    })
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {items}
      </ul>
    </section>
  )
}