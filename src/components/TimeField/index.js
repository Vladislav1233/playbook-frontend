import React, { Component } from 'react';
import TimePicker from 'react-timekeeper';
import cn from 'classnames';

// Note: style
import '../../style/bem-blocks/b-time-field/index.scss';

class TimeField extends Component {
    state = {
        displayTimepicker: false
    }

    toggleTimekeeper = (val) => {
        console.log('click');
        this.setState({displayTimepicker: val})
    }

    render() {
        const { time, onChangeTime, name, label } = this.props;
        const keeperWrapperClass = cn('b-time-field__keeper-wrapper', {
            'show': this.state.displayTimepicker
        })

        return (
            <div className="b-time-field">
                    <div className={keeperWrapperClass}>
                        <TimePicker 
                            time={time}
                            onChange={(value) => onChangeTime(value, name)}
                            switchToMinuteOnHourSelect={true}
                            onDoneClick={() => this.toggleTimekeeper(false)}
                        />
                    </div>

                <div className="b-time-field__field">
                    {label 
                        ? <div className="b-time-field__label">{label}</div>
                        : null
                    }
                    <div onClick={() => this.toggleTimekeeper(true)} className="b-time-field__input">
                        {time ? time : '__ : __'}
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeField;
