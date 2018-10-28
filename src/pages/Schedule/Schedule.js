import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScheduleList from '../../components/ScheduleList';
import DateCalendar from '../../components/Calendar';

import { getScheduleChooseDay } from '../../store/actions/Schedule';

import './Schedule.scss';

class Schedule extends Component {
    renderTemplateListSchedule = () => {
        const {listSchedule} = this.props;
        console.log(listSchedule);
    
        return listSchedule.map(item => (
            <div className="b-schedule" key={item.date}>
                <div className="b-schedule__date">{item.nameDay}, {item.date}. 
                    <div className="b-schedule__timetable">Время работы: 9:00 - 19:00</div>
                </div>
                <ScheduleList list={item.list} />
            </div>
        ))
    }

    render() {
        console.log(this.props);
        return (
            <main className="b-main">
                <DateCalendar onFilterSchedule={this.props.onFilterSchedule}/>
                <div className="container">
                    {this.renderTemplateListSchedule()}
                </div>
            </main>
        )
    }
}

const filterSchedule = (schedule, day) => {
    if (day === '') {
        function formatDate(date) {
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            
            let yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;
            
            return dd + '.' + mm + '.' + yy;
        }
        return schedule.filter(item => item.date === formatDate(new Date()));
    } else {
        return schedule.filter(item => item.date === day);
    }
}

const mapStateToProps = store => {
    console.log(store);
    return {
        listSchedule: filterSchedule(store.listSchedule, store.getDayFilter)
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        onFilterSchedule: (date) => {
            dispatch(getScheduleChooseDay(date));
        }
    }
}
  
export default connect(mapStateToProps, mapStateToDispatch)(Schedule)
