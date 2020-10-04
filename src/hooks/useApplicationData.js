import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // REACT STATE DECL
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {},
  });
  
  // A X I O S   G E T   A L L   P R O M I S E S
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((data) => {
      const [days, appointments, interviewers] = data;
      // pull *all* the data, into an array of get response data
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
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
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  return { state, bookInterview, cancelInterview };
}