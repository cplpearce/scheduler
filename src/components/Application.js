import React, { useState } from "react";

import "components/Application.scss";
import "components/DayListItem.scss";

import Appointments from 'components/Appointments'

import DayList from "./DayList"

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Clinton Pearce",
      interviewer: {
        id: 3,
        name: "Smarter Clint",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Izzy Verra",
      interviewer: {
        id: 2,
        name: "A Wild Turkey",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];

export default function Application(props) {
  const [ day, setDay ] = useState("Monday")

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
            days={days}
            day={day}
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
        {appointments.map(appointment => (
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
