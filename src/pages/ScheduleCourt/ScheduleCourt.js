import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleChooseDay } from '../../store/actions/Schedule';

// component
import Schedule from '../../components/Schedule/Schedule';

// helpers
import { filterSchedule } from '../../helpers/filterSchedule';

class ScheduleCourt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduleCourt: props.scheduleCourt
        }
    }

    render() {
        const { onFilterSchedule } = this.props;
        const { scheduleCourt } = this.state;
        console.log(scheduleCourt);
        

        return (
            <Schedule
                schedule={scheduleCourt}
                onFilterSchedule={onFilterSchedule}
            />
        )
    }
}

const mapStateToProps = store => {
    return {
        scheduleCourt: filterSchedule(store.scheduleCourt, store.getDayFilter)
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        onFilterSchedule: (date) => {
            dispatch(getScheduleChooseDay(date));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(ScheduleCourt);