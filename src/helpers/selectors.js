export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) { return [] }
  try {
    const appointments = state.days.find(dayObj => dayObj.name === day).appointments || []
    return Object.values(state.appointments).filter(appointment => Object.values(appointments).includes(appointment.id))
  } catch (err) {
    return []
  }
}