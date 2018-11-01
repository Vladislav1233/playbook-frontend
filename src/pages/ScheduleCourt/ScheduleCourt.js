import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleChooseDay } from '../../store/actions/Schedule';

// component
import Schedule from '../../components/Schedule/Schedule';

// helpers
import { filterSchedule } from '../../helpers/filterSchedule';

class ScheduleCourt extends Component {

    render() {
        const { onFilterSchedule, scheduleCourt } = this.props;

        const settingSlider = {
            nav: false,
            autoHeight: true,
            controlsText: ["‹", "›"],

            responsive: {
                768: {
                    gutter: 15
                }
            }
        }

        return (
            <Schedule
                schedule={scheduleCourt}
                onFilterSchedule={onFilterSchedule}
                settingSlider={settingSlider}
                template={'court'}
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