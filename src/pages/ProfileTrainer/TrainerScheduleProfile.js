import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerSchedule, getScheduleChooseDay } from '../../store/actions/schedule';

// Note: component
import Schedule from '../../components/Schedule/Schedule';

// helpers
import { filterSchedule } from '../../helpers/filterSchedule';

// Note: style
import '../../style/bem-blocks/b-trainer-schedule-profile/index.scss';

class TrainerScheduleProfile extends Component {
    render() {
        const { scheduleTrainer, onFilterSchedule } = this.props;

        return(
            <div className="b-trainer-schedule-profile">
                <Schedule 
                    schedule={scheduleTrainer}
                    onFilterSchedule={onFilterSchedule}
                    template={'trainer'}
                />
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        scheduleTrainer: filterSchedule(store.scheduleTrainer.scheduleTrainer, store.getDayFilter)
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        onFilterSchedule: (date) => {
            dispatch(getScheduleChooseDay(date));
        }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerScheduleProfile);