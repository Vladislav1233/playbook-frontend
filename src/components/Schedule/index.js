// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';
import { dataTime } from '../../helpers/dataTime';

// component
import DateCalendar from '../../components/Calendar';
import ScheduleList from './ScheduleList';
import TinySlider from "tiny-slider-react";

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import '../../style/bem-blocks/b-slider-schedule/index.scss';

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
        const { schedule, template, bookedTime, cost, playgroundsForTraining, userId } = this.props;

        const notScheduleTemplate = () => (
            <div className="b-schedule__not">Нет свободного времени</div>
        );

        return (
            <Fragment>
                <DateCalendar onClickDay={this.onClickDay}/>
                <div className="container container--schedule">
                    <div className="b-schedule">
                        <div className="b-schedule__date">{schedule.nameDay}, {schedule.date}.
                            {schedule.timeWork ? <div className="b-schedule__timetable">Время работы: {schedule.timeWork}</div> : null}
                        </div>
                        
                        {/* Note: блок стоимости */}
                        {cost.length > 0 
                            ? 
                            <div className="b-schedule__price">
                                <div className="b-schedule__title">Стоимость</div>
                                {cost.map((item, index) => {
                                    return (
                                        <span className="b-schedule__cost" key={index}> 
                                            {`${item.time} будет `}

                                            <span className="b-schedule__price-value">
                                                {`${item.cost} р/час`}
                                            </span>
                                        </span>
                                    );
                                })}
                            </div>
                            
                            : null
                        }

                        {playgroundsForTraining.length > 0 ? 
                            <div className='b-schedule__playground'>
                                <div className="b-schedule__title">Тренирую на</div>
                                
                                {playgroundsForTraining.map(item => {
                                    return (
                                        <div className="b-schedule__playground-item" key={item.id}>
                                            <div className="b-schedule__playground-name">{item.name}</div>
                                            <div className="b-schedule__playground-address">{item.address}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        : null}
                        
                        <div className="b-schedule__title">Расписание</div>
                        {/* Note: расписание свободного времени тренера */}
                        {template === 'trainer' ?
                            schedule.schedule.length > 0
                                ? <ScheduleList 
                                    list={schedule.schedule}
                                    template={template} 
                                    playgroundsForTraining={playgroundsForTraining} 
                                    userId={userId}
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
                            ? <ScheduleList 
                                list={bookedTime}
                                template={template} />
                            : null
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Schedule;
