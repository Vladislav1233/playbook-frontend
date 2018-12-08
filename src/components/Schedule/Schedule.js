// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';

// component
import DateCalendar from '../../components/Calendar';
import ScheduleList from '../../components/ScheduleList';
import TinySlider from "tiny-slider-react";

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import '../../style/bem-blocks/b-slider-schedule/index.scss';

class Schedule extends Component {
    componentDidUpdate() {
        this.refreshSlider();
    }

    // Слайдер оставляет transform когда он дестроится и нельзя отловить refresh, пришлось костылить.
    refreshSlider = () => {
        if (this.ts) {
            if (this.ts.slider === undefined) {
                this.ts.ref.style.transform = '';
                this.ts.ref.style.transitionDuration = '0s';
            } else {
                this.ts.ref.style.transitionDuration = '0s';
            }
        }
    }

    // TODO: Перенести в action
    onClickDay = (value) => {
        function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
        }
        console.log(this.props);

        this.props.onFilterSchedule(formatDate(value));
    };

    render() {
        const { schedule, template } = this.props;

        return (
            <Fragment>
                <DateCalendar
                    onClickDay={this.onClickDay}
                />
                <div className="container container--schedule">
                    {schedule 
                        ?
                        <div className="b-schedule">
                            <div className="b-schedule__date">{schedule.nameDay}, {schedule.date}. 
                                {schedule.timeWork ? <div className="b-schedule__timetable">Время работы: {schedule.timeWork}</div> : null}
                            </div>
                            {schedule.list ? 
                                <ScheduleList list={schedule.list} telTrainer={schedule.telTrainer} template={template} />
                                :
                            schedule.court ? 
                                <TinySlider className="b-slider-schedule" settings={this.props.settingSlider} ref={ts => this.ts = ts}>
                                    {schedule.court.map((schedule) => (
                                        <div className="b-slider-schedule__slide" key={schedule.id}>
                                            <div className="b-slider-schedule__header">
                                                <div className="b-slider-schedule__title">{schedule.name}: {schedule.type}</div>
                                            </div>
                                            <ScheduleList list={schedule.list} template={template} key={schedule.id}/>
                                        </div>
                                    ))}
                                </TinySlider>
                                :
                                null   
                            }
                        </div>
                        :
                        <div>
                            Расписания нет, sorry!
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}

export default Schedule;


