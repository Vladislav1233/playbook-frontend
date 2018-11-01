// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';

// component
import DateCalendar from '../../components/Calendar';

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import ScheduleList from '../../components/ScheduleList';

class Schedule extends Component {
    render() {
        const { schedule } = this.props;

        return (
            <Fragment>
                <DateCalendar onFilterSchedule={this.props.onFilterSchedule}/>
                <div className="container container--schedule">
                    {schedule 
                        ?
                        <div className="b-schedule">
                            <div className="b-schedule__date">{schedule.nameDay}, {schedule.date}. 
                                <div className="b-schedule__timetable">Время работы: 9:00 - 19:00</div>
                            </div>
                            <ScheduleList list={schedule.list} telTrainer={schedule.telTrainer} />
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
