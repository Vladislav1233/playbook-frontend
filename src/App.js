import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ScheduleList from './components/ScheduleList';
import DateCalendar from './components/Calendar';
import './components/Schedule/Schedule.css';

class App extends Component {

  renderTemplateListSchedule = () => {
    // return console.log(this.props);
    const {listSchedule} = this.props;
    console.log(listSchedule);

    return listSchedule.map(item => (
      <div className="b-schedule" key={item.date}>
        <div className="b-schedule__date">{item.nameDay}, {item.date}. 
          <div className="b-schedule__timetable">Время работы: 9:00 - 19:00</div>
        </div>
        <ScheduleList list={item.list} />
      </div>
    ))
  }

  // filterSchedule = () => {

  // }

  render() {
    // console.log(this.props);
    return (
      <main className="b-main">
        <DateCalendar onFilterSchedule={this.props.onFilterSchedule}/>
        <div className="container">
          {this.renderTemplateListSchedule()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  console.log(store.filterListSchedule);
  return {
    toggleSchedule: store.toggleSchedule,
    listSchedule: store.listSchedule.filter(item => item.date.includes(store.filterListSchedule))
    // listSchedule: store.listSchedule
  }
}

const mapStateToDispatch = (dispatch) => {
  // console.log(dispatch);
  return {
    onFilterSchedule: (date) => {
      console.log('date', date);
      dispatch({type: 'FILTER_SCHEDULE', payload: date});
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(App)
