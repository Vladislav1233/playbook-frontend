import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'

class DateCalendar extends Component {

  onClickDay = (value) => {

    function formatDate(date) {

      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;
    
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
    
      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;
    
      return dd + '.' + mm + '.' + yy;
    }
    // console.log(formatDate(value), typeof(value));
    this.props.onFilterSchedule(formatDate(value));
    // console.log(this.props);
  }

  render() {

    return (
      <div className="b-date-calendar">
        <Calendar className="b-date-calendar__calendar" 
          onClickDay={this.onClickDay}
          minDetail='month'
        />
      </div>
    )
  }
}

export default DateCalendar
