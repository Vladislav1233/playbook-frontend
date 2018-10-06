import React, { Component } from 'react';
import './ScheduleList.scss';
import ScheduleItem from '../ScheduleItem'

class ScheduleList extends Component {
  listScheduleData = this.props.list;

  listScheduleTemplate = this.listScheduleData.map(item => (
    <li className="b-schedule-list__item" key={item.idItemScheduleList}>
      <ScheduleItem dataScheduleItem={item}/>
    </li>
  ))


  render() {
    // console.log(this.listSchedule);
    return (
      <ul className="b-schedule-list">
        {this.listScheduleTemplate}
      </ul>
    )
  }
}

export default ScheduleList
