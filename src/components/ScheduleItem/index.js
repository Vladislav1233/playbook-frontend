import React, { Component } from 'react';
import './ScheduleItem.css';

class ScheduleItem extends Component {
  
  render() {
    return (
      
      <div>
        {/* // state one - свободно */}
        <div className="b-schedule-item">
          <div className="b-schedule-item__time-wrap">
            <div className="b-schedule-item__time">10:00</div>
            <div className="b-schedule-item__time b-schedule-item__time--finish">12:00</div>
          </div>
          <div className="b-schedule-item__info">
            <div className="b-schedule-item__state">Свободно <span className="b-schedule-item__price">200 р/час</span></div>
            <div className="b-schedule-item__court">4 корт</div>
            <div className="b-schedule-item__name">Кликни на блок для брони</div>
          </div>
        </div>

        {/* // state two - Занято */}
      </div>

      
    )
  }
}

export default ScheduleItem
