// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';

// component
import DateCalendar from '../../components/Calendar';
import ScheduleList from '../../components/ScheduleList';
import Slider from 'react-slick';

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import '../../style/bem-blocks/b-slider-schedule/index.scss';

class Schedule extends Component {
    render() {
        const { schedule, template } = this.props;
        console.log(template);

        return (
            <Fragment>
                <DateCalendar onFilterSchedule={this.props.onFilterSchedule}/>
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
                                <Slider className="b-slider-schedule" {...this.props.settingSlider}>
                                    {schedule.court.map((schedule) => (
                                        <div className="b-slider-schedule__slide" key={schedule.id}>
                                            <div className="b-slider-schedule__header">
                                                <div className="b-slider-schedule__title">{schedule.name}: {schedule.type}</div>
                                            </div>
                                            <ScheduleList list={schedule.list} template={template} key={schedule.id}/>
                                        </div>
                                    ))}
                                </Slider>
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


