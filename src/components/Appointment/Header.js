import React from "react";

// H E A D E R   F O R   T H E   A P P O I N T M E N T
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
