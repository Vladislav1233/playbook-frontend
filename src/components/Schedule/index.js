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
        this.props.getTrainerSchedule(this.props.userId, data);
    };

    render() {
        const { schedule, template, bookedTime, cost, playgroundsForTraining, userId, isWhoBooked, onClickDecline } = this.props;

        const notScheduleTemplate = () => (
            <div className="b-schedule__not">Нет свободного времени</div>
        );

        return (
            <Fragment>
                <DateCalendar onClickDay={this.onClickDay}/>
                <div className="container container--schedule">
                    <div className="b-schedule">
                        <div className="b-schedule__date">{schedule.nameDay}, {Moment(schedule.date).format('DD.MM.YYYY')}.
                            {schedule.timeWork ? <div className="b-schedule__timetable">Время работы: {schedule.timeWork}</div> : null}
                        </div>
                        
                        {/* Note: блок стоимости */}
                        {cost.length > 0 
                            ? 
                            <div className="b-schedule__price">
                                <div className="b-schedule__title">Стоимость:</div>
                                {cost.map((item, index) => {
                                    const getTimeOutRange = (indexPostition) => Moment(item.time.toDate()[indexPostition]).format('HH:mm');
                                    return (
                                        <span className="b-schedule__cost" key={index}> 
                                            {`${getTimeOutRange(0)} - ${getTimeOutRange(1)} будет `}

                                            <span className="b-schedule__price-value">
                                                <NumberFormat 
                                                    value={convertTypeMoney(item.cost, 'RUB', 'banknote')} 
                                                    suffix=' ₽/час'
                                                    thousandSeparator={' '}
                                                    displayType='text'
                                                    decimalScale={2}
                                                />
                                            </span>
                                        </span>
                                    );
                                })}
                            </div>
                            
                            : null
                        }

                        {playgroundsForTraining.length > 0 ? 
                            <div className='b-schedule__playground'>
                                <div className="b-schedule__title">Тренирую на:</div>
                                
                                {playgroundsForTraining.map(item => {
                                    return (
                                        <div className="b-schedule__playground-item" key={item.id}>
                                            <div className="b-schedule__playground-name">{item.name}</div>
                                            <div className="b-schedule__playground-address">({item.address})</div>
                                        </div>
                                    )
                                })}
                            </div>
                        : null}
                        
                        <div className="b-schedule__title">Расписание:</div>
                        {/* Note: расписание свободного времени тренера */}
                        {template === 'trainer' ?
                            schedule.schedule.length > 0
                                ? <ScheduleList 
                                    list={schedule.schedule}
                                    template={template} 
                                    playgroundsForTraining={playgroundsForTraining} 
                                    userId={userId}
                                    cost={cost}
                                />
                                : notScheduleTemplate()
                        : null}
                        
                        {/* Note: Расписание свободного времени кортов */}
                        {template === 'court' ? 
                            schedule.court
                                ? <TinySlider className="b-slider-schedule" settings={this.props.settingSlider} ref={ts => this.ts = ts}>
                                    {schedule.court.map((schedule) => (
                                        <div className="b-slider-schedule__slide" key={schedule.id}>
                                            <div className="b-slider-schedule__header">
                                                <div className="b-slider-schedule__title">{schedule.name}: {schedule.type}</div>
                                            </div>

                                            <ScheduleList 
                                                list={schedule.list} 
                                                template={template} 
                                                key={schedule.id} />
                                        </div>
                                    ))}
                                </TinySlider>
                                : notScheduleTemplate()
                        : null}
                        
                        {/* Note: Расписание забронированного времени */}
                        {bookedTime.length > 0 
                            ? ( <Fragment>
                                <div className="b-schedule__title">Забронированное время</div>
                                <ScheduleList 
                                    list={bookedTime}
                                    template={template}
                                    isWhoBooked={isWhoBooked} 
                                    onClickDecline={onClickDecline}
                                /> 
                            </Fragment>)
                            : null
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Schedule;
