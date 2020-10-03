// framework imports
import React, { useState, useEffect } from "react";
// component imports
import "components/Application.scss";
import "components/DayListItem.scss";
import DayList from "./DayList"
import Appointment from 'components/Appointment'
// helper imports
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';
// middleware import
const axios = require('axios');

export default function Application(props) {
  // react states
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview} 
      />
    );
  })
  // axios get on all endpoints of the API server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
        console.log(err.response.status)
        console.log(err.response.headers)
        console.log(err.response.data)
      })
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      .catch(err => {
        console.log(err.response.status)
        console.log(err.response.headers)
        console.log(err.response.data)
      })
  }, []);

  render() {
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
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  };
}

// Older commented code for referencing later

/*
const urls = {
  GET_DAYS: 'http://localhost:8001/api/days',
  GET_APPOINTMENTS: 'http://localhost:8001/api/appointments',
  GET_INTERVIEWERS: 'http://localhost:8001/api/interviewers',
}

const promiseDays = axios.get(urls.GET_DAYS)
const promiseAppointments = axios.get(urls.GET_APPOINTMENTS)
const promiseInterviewers = axios.get(urls.GET_INTERVIEWERS)

useEffect(() => {
  const url = 'http://localhost:8001/api/days';
  axios.get(url)
    .then(res => setDays([...res.data]))
}, [])
*/
