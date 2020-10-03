function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) { return [] }
  try {
    const appointments = state.days.find(dayObj => dayObj.name === day).appointments || []
    return Object.values(state.appointments).filter(appointment => Object.values(appointments).includes(appointment.id))
  } catch (err) {
    return []
  }
};

function getInterview(state, interview) {
  const appointment = { ...interview };
  const interviewerID = interview && interview.interviewer;
  // If no interview, return null
  if (!interview) { return null }
  
  Object.values(state.interviewers).map(
    interview => {
      if (Number(interview.id) === interviewerID) { 
        appointment.interviewer = state.interviewers[interviewerID] 
      }
    })
  return appointment;
};

export { getAppointmentsForDay, getInterview };