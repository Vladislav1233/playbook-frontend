import React, {Component} from 'react';
import Calendar from 'react-calendar';
import './Calendar.scss'

class DateCalendar extends Component {

  state = {
    date: new Date()
  };

  // TODO: Перенести в action
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

    this.props.onFilterSchedule(formatDate(value));
  };

  render() {
    return (
      <div className="b-date-calendar">
        <Calendar className="b-date-calendar__calendar"
          onClickDay={this.onClickDay}
          minDetail='month'
          value={this.state.date}
        />
      </div>
    )
  }
}

export default DateCalendar
