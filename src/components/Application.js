// F R A M E W O R K   I M P O R T S
import React, { useState, useEffect } from "react";

// C O M P O N E N T   I M P O R T S
import "components/Application.scss";
import "components/DayListItem.scss";
import DayList from "components/DayList"
import Appointment from 'components/Appointment'

// H E L P E R   I M P O R T S
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';

// M I D D L E W A R E   I M P O R T S
const axios = require('axios');

// A P P L I C A T I O N   B E G I N S
export default function Application(props) {
  // R E A C T   S T A T E   D E C L
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewer: {},
  })

  // appointments selector helper function
  const appointments = getAppointmentsForDay(state, state.day);
  
  // A X I O S   G E T   A L L   P R O M I S E S
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(data => {
      const [days, appointments, interviewers] = data;
      // pull *all* the data, into an array of get response data
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }))
    })
  }, []);

  // M O D I F Y   I N T E R V I E W S
  // Book a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
      });
    });
  }
  
  // Cancel an interview
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({
        ...state,
        appointments
      });
    })
  }

  // A P P L I C A T I O N   R E N D E R
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={ state.days }
            day={ state.day }
            setDay={ day => setState({ ...state, day: day }) }
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);
          return (
            <Appointment
              {...appointment}
              key={appointment.id}
              id={appointment.id}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
