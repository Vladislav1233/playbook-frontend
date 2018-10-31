// Note: Компонент вывод расписания пользователю, который используется для вывода расписания и корта и тренера.
import React, { Component, Fragment } from 'react';

// component
import DateCalendar from '../../components/Calendar';

// style
import '../../style/bem-blocks/b-schedule/index.scss';
import ScheduleList from '../../components/ScheduleList';

class Schedule extends Component {
    render() {
        const { scheduleTrainer } = this.props;

        return (
            <Fragment>
                <DateCalendar onFilterSchedule={this.props.onFilterSchedule}/>
                <div className="container container--schedule">
                    {scheduleTrainer 
                        ?
                        <div className="b-schedule">
                            <div className="b-schedule__date">{scheduleTrainer.nameDay}, {scheduleTrainer.date}. 
                                <div className="b-schedule__timetable">Время работы: 9:00 - 19:00</div>
                            </div>
                            <ScheduleList list={scheduleTrainer.list} />
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
