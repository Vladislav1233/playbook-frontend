import React, { Component } from 'react';
import './ScheduleItem.scss';

class ScheduleItem extends Component {
  
  render() {
    // console.log(this.props.dataScheduleItem);
    const {startTime, finishTime, court, price, status} = this.props.dataScheduleItem;

    return (
      <div className="b-schedule-item">
        <div className="b-schedule-item__time-wrap">
          <div className="b-schedule-item__time">{startTime}</div>
          <div className="b-schedule-item__time b-schedule-item__time--finish">{finishTime}</div>
        </div>
        <div className="b-schedule-item__info">
          <div className={`b-schedule-item__state ${status ? 'b-schedule-item__state--free': 'b-schedule-item__state--busy'}`}>{status ? 'Свободно' : 'Занято'} <span className="b-schedule-item__price">{price} р/час</span></div>
          <div className="b-schedule-item__court-info">Корт №{court}</div>
          <div className="b-schedule-item__court-info">Тип: искуственная трава</div>
          <div className="b-schedule-item__court-info b-schedule-item__court-info--click">Кликни на блок для брони</div>
        </div>
      </div>
    )
  }
}

export default ScheduleItem
