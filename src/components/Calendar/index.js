import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'

class DateCalendar extends Component {
  render() {

    return (
      <div className="b-date-calendar">
        <Calendar className="b-date-calendar__calendar" />
      </div>
    )
  }
}

export default DateCalendar
