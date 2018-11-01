import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScheduleChooseDay } from '../../store/actions/Schedule';

// component
import Schedule from '../../components/Schedule/Schedule';

// helpers
import { filterSchedule } from '../../helpers/filterSchedule';

class ScheduleCourt extends Component {
  render() {
    return (
        <Schedule 
            onFilterSchedule={this.props.onFilterSchedule}
        />
    )
  }
}

const mapStateToProps = store => {
  return {
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