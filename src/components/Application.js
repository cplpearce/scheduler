import React, { useState, useEffect } from "react";


import "components/Application.scss";
import "components/DayListItem.scss";

import Appointments from 'components/Appointments'

import DayList from "./DayList"

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];
  
  const urls = {
    GET_DAYS: 'http://localhost:8001/api/days',
    GET_APPOINTMENTS: 'http://localhost:8001/api/appointments',
    GET_INTERVIEWERS: 'http://localhost:8001/api/interviewers',
  }

  useEffect(() => {
    const url = 'http://localhost:8001/api/days';
    axios.get(url)
      .then(res => setDays([...res.data]))
  }, [])

  useEffect(() => {
    axios.get(urls.GET_DAYS)
  })

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState((prev) => ({ ...prev, days }));

  const promiseDays = axios.get(urls.GET_DAYS)
  const promiseAppointments = axios.get(urls.GET_APPOINTMENTS)
  const promiseInterviewers = axios.get(urls.GET_INTERVIEWERS)

  Promise.all([promiseDays, promiseAppointments, promiseInterviewers]).then(function (values) {
    console.log(values);
  });

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
        {dailyAppointments.map(appointment => (
          <Appointments
            key={appointment.id}
            {...appointment}
          />
          
        ))}
        <Appointments key="last" time="5pm" />
      </section>
    </main>
  );
}
