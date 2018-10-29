import React, { Component } from 'react';
import './ScheduleList.scss';
import ScheduleItem from '../ScheduleItem';

class ScheduleList extends Component {


  render() {
    const listScheduleData = this.props.list;

    return (
        <ul className="b-schedule-list">
            {listScheduleData ? listScheduleData.map(item => (
                <li className="b-schedule-list__item" key={item.idItemScheduleList}>
                    <ScheduleItem dataScheduleItem={item}/>
                </li>
            )) 
            : 
                <div>Расписания нет</div>
            }
        </ul>
    )
  }
}

export default ScheduleList;
