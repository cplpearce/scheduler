// F I L T E R   A P P O I N T M E N T S
function getAppointmentsForDay(state, dayName) {
  const day = state.days.find(d => d.name === dayName)
  return (day && state.days.find(d => d.name === dayName).appointments.map(key => state.appointments[key]) || [])
};

// F I L T E R   I N T E R V I E W E R S
function getInterviewersForDay(state, dayName) {
  const day = state.days.find(d => d.name === dayName)
  return (day && state.days.find(d => d.name === dayName).interviewers.map(key => state.interviewers[key]) || [])
};

// G E T   S P E C I F I C   I N T E R V I E W 
function getInterview(state, interview) {
  return (interview && { ...interview, interviewer: state.interviewers[interview.interviewer] })
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };