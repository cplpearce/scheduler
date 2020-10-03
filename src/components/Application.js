// F R A M E W O R K   I M P O R T S
import React, { useState, useEffect } from "react";
// C O M P O N E N T   I M P O R T S
import "components/Application.scss";
import "components/DayListItem.scss";
import DayList from "./DayList"
import Appointment from 'components/Appointment'
// H E L P E R   I M P O R T S
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';
// M I D D L E W A R E   I M P O R T S
const axios = require('axios');

// A P P L I C A T I O N   B E G I N S
export default function Application(props) {
  // REACT STATE DECL
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })

  // set the day state variable when called
  const setDay = day => setState({ ...state, day });
  // appointments selector helper function
  const appointments = getAppointmentsForDay(state, state.day);
  // generate the schedule with the appointment selector
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key = { appointment.id } 
        { ...appointment } 
        interview = { interview } 
      />
    );
  })
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
      .catch(err => {
        console.log(err.response.status)
        console.log(err.response.headers)
        console.log(err.response.data)
      })
      // only call once
  }, []);

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
            setDay={ setDay }
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
