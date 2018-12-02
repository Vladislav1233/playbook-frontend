import React, { Component } from 'react';
import TimePicker from 'react-timekeeper';

class TimeField extends Component {
    state = {
        displayTimepicker: true
    }

    toggleTimekeeper = (val) => {
        console.log('click');
        this.setState({displayTimepicker: val})
    }

    render() {
        const { time, onChangeTime, name } = this.props;

        return (
            <div className="b-time-field">
                {this.state.displayTimepicker ?
                    <TimePicker 
                        time={time}
                        onChange={(value) => onChangeTime(value, name)}
                        switchToMinuteOnHourSelect={true}
                        onDoneClick={() => {
                            this.toggleTimekeeper(false)
                        }}
                    /> : null}

                <div className="b-time-field__time">
                    {time ? time : '__ : __'}
                </div>
            </div>
        )
    }
}

export default TimeField;
