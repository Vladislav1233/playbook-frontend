import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ScheduleList from './components/ScheduleList';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class App extends Component {

  renderTemplateListSchedule = () => {
    // return console.log(this.props);

    const {listSchedule} = this.props;

    return listSchedule.map(item => (
      <div className="b-schedule" key={item.date}>
        <div className="b-schedule__date">{item.date}</div>
        <ScheduleList list={item.list} />
      </div>
    ))
  }

  render() {
    // Render the Calendar
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    // console.log(this.props);
    return (
      <main className="b-main">
        <InfiniteCalendar 
          width={400}
          height={600}
          selected={today}
          disabledDates={[0,6]}
          minDate={lastWeek}
          displayOptions={{
            showOverlay: false
          }}
        />

        {this.renderTemplateListSchedule()}
      </main>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    toggleSchedule: store.toggleSchedule,
    listSchedule: store.listSchedule
  }
}

export default connect(mapStateToProps)(App)
