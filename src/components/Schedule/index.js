// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';
import { dataTime } from '../../helpers/dataTime';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import NumberFormat from 'react-number-format';

// component
import DateCalendar from '../../components/Calendar';
import ScheduleList from './ScheduleList';
import TinySlider from "tiny-slider-react";
import Preloader from '../Preloader/Preloader';

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import '../../style/bem-blocks/b-slider-schedule/index.scss';

const Moment = extendMoment(moment);

class Schedule extends Component {

  componentDidUpdate() {
    this.refreshSlider();
  }

  // Note: Слайдер оставляет transform когда он дестроится и нельзя отловить refresh, пришлось костылить.
  refreshSlider = () => {
    if (this.ts) {
      if (this.ts.slider === undefined) {
        this.ts.ref.style.transform = '';
        this.ts.ref.style.transitionDuration = '0s';
      } else {
        this.ts.ref.style.transitionDuration = '0s';
      }
    }
  };

  onClickDay = (value) => {
    const data = dataTime({
      valueStart: value,
      valueEnd: value
    });
    this.props.getTrainerSchedule(this.props.userId, data, this.props.isWhoBooked);
  };

  render() {
    const {
      schedule,
      template,
      bookedTime,
      cost,
      playgroundsForTraining,
      userId,
      isWhoBooked,
      onClickDecline,
      preloader,
      titlePage,
      noteTitle
    } = this.props;

    const notScheduleTemplate = () => (
      <ul className="b-schedule-list">
        <li className="b-schedule-list__item b-schedule-list__item--empty">
          <div className="b-schedule-item b-schedule-item--empty">
            <div className="b-schedule-item__time b-schedule-item__time--finish">
              Всё время уже забронированно
            </div>
          </div>
        </li>
      </ul>
    );

    return (
      <Fragment>
        <div className="b-schedule">
          <DateCalendar onClickDay={ this.onClickDay } />
          <div className="b-schedule__content">

            <h1 className="b-schedule__title-page">
              { titlePage }

              { noteTitle &&
                <span className="b-schedule__title-note">
                  { noteTitle }
                </span>
              }
            </h1>

            <section className="b-schedule__card">
              <div className="b-schedule__date">
                <div className="b-schedule__date-top">{ schedule.nameDay }</div>
                <div className="b-schedule__date-bottom">{ schedule.date.format('DD.MM.YYYY') }</div>
                { schedule.timeWork ? <div className="b-schedule__timetable">Время работы: { schedule.timeWork }</div> : null }
              </div>

              {/* Note: блок стоимости */ }
              { cost.length > 0
                ?
                <div className="b-schedule__price">
                  <div className="b-schedule__title">Стоимость:</div>
                  { cost.map((item, index) => {

                    const getTimeOutRange = (indexPostition) => Moment(item.time.toDate()[indexPostition]).format('HH:mm');

                    return (
                      <span className="b-schedule__cost" key={ index }>
                        { `${getTimeOutRange(0)} - ${getTimeOutRange(1)} будет ` }

                        <span className="b-schedule__price-value">
                          <NumberFormat
                            value={ convertTypeMoney(item.cost, 'RUB', 'banknote') }
                            suffix=' ₽/час'
                            thousandSeparator={ ' ' }
                            displayType='text'
                            decimalScale={ 2 }
                          />
                        </span>
                      </span>
                    );
                  }) }
                </div>

                : null
              }

              { playgroundsForTraining.length > 0 ?
                <div className='b-schedule__playground'>
                  <div className="b-schedule__title">Тренирую на:</div>

                  { playgroundsForTraining.map(item => {
                    return (
                      <div className="b-schedule__playground-item" key={ item.uuid }>
                        <div className="b-schedule__playground-name">{ item.name }</div>
                        <div className="b-schedule__playground-address">({ item.address })</div>
                      </div>
                    )
                  }) }
                </div>
                : null }

              <div className="b-schedule__title b-schedule__title--list">Свободное время:</div>
              {/* Note: расписание свободного времени тренера */ }
              { template === 'trainer' ?
                schedule.schedule.length > 0
                  ? <ScheduleList
                    list={ schedule.schedule }
                    template={ template }
                    playgroundsForTraining={ playgroundsForTraining }
                    userId={ userId }
                    cost={ cost }
                  />
                  : notScheduleTemplate()
                : null }

              {/* Note: Расписание свободного времени кортов */ }
              { template === 'court' ?
                schedule.court
                  ? <TinySlider className="b-slider-schedule" settings={ this.props.settingSlider } ref={ ts => this.ts = ts }>
                    { schedule.court.map((schedule) => (
                      <div className="b-slider-schedule__slide" key={ schedule.uuid }>
                        <div className="b-slider-schedule__header">
                          <div className="b-slider-schedule__title">{ schedule.name }: { schedule.type }</div>
                        </div>

                        <ScheduleList
                          list={ schedule.list }
                          template={ template }
                          key={ schedule.uuid } />
                      </div>
                    )) }
                  </TinySlider>
                  : notScheduleTemplate()
                : null }

              {/* Note: Расписание забронированного времени */ }
              { bookedTime.length > 0
                ? (<Fragment>
                  <div className="b-schedule__title b-schedule__title--list">Забронированное время:</div>
                  <ScheduleList
                    list={ bookedTime }
                    template={ template }
                    isWhoBooked={ isWhoBooked }
                    onClickDecline={ onClickDecline }
                  />
                </Fragment>)
                : null
              }
            </section>
          </div>
        </div>

        { preloader ? <Preloader /> : null }
      </Fragment>
    )
  }
}

export default Schedule;
