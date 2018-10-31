import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleChooseDay } from '../../store/actions/Schedule';

// component
import Schedule from '../../components/Schedule/Schedule';

class ScheduleTrainer extends Component {

    render() {
        console.log('render ScheduleTrainer');
        const { scheduleTrainer, onFilterSchedule } = this.props;

        return (
            <Schedule 
                schedule={scheduleTrainer}
                onFilterSchedule={onFilterSchedule}
            />
        )
    }
}


// TODO: весь filterSchedule можно сделать как middleware, обдумать это и реализовать
const filterSchedule = (schedule, day) => {

    if (day === '') {
        // Note: При инициализации у нас нет даты в store, так как мы ещё не делали клик. Поэтому мы берем сегоднящнюю дату, парсим её и фильтруем расписание по сегоднящней дате.
        function formatDate(date) {
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            
            let mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            
            let yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;
            
            return dd + '.' + mm + '.' + yy;
        }
        const scheduleObj = schedule.filter(item => item.date === formatDate(new Date()));
        return scheduleObj[0];
    } else {
        // Note: Когда кликнули на дату в календаре мы её получаем и фильтруем расписание по дате в календаре.
        const scheduleObj = schedule.filter(item => item.date === day);
        return scheduleObj[0];
        
    }
}

const mapStateToProps = store => {
    return {
        scheduleTrainer: filterSchedule(store.scheduleTrainer, store.getDayFilter)
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        onFilterSchedule: (date) => {
            dispatch(getScheduleChooseDay(date));
        }
    }
}
  
export default connect(mapStateToProps, mapStateToDispatch)(ScheduleTrainer)
