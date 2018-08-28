import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ScheduleList from './components/ScheduleList';
import DateCalendar from './components/Calendar';

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
    // console.log(this.props);
    return (
      <main className="b-main">
        <DateCalendar />
        <div className="container">
          {this.renderTemplateListSchedule()}
        </div>
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
