import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleChooseDay } from '../../store/actions/Schedule';

// component
import Schedule from '../../components/Schedule/Schedule';

// helpers
import { filterSchedule } from '../../helpers/filterSchedule';

class ScheduleTrainer extends Component {

    render() {
        console.log('render ScheduleTrainer');
        const { scheduleTrainer, onFilterSchedule } = this.props;

        return (
            <Schedule 
                schedule={scheduleTrainer}
                onFilterSchedule={onFilterSchedule}
                template={'trainer'}
            />
        )
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
