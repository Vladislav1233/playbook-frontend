import React, { Component } from 'react';
import TimePicker from 'react-timekeeper';
import cn from 'classnames';

// Note: style
import '../../style/bem-blocks/b-time-field/index.scss';

class TimeField extends Component {
    state = {
        displayTimepicker: false
    };

    /**
     * Toggle time keeper
     * @return void
     */
    toggleTimekeeper = (val) => {
        this.setState({displayTimepicker: val})
    };

    /**
     * Handle time picker change event
     * @return void
     */
    onChange(value, name) {
        if (value.hour24 < 10) {
            value.formatted24 = '0' + value.formatted24;
        }

        this.props.onChangeTime(value, name);
    }

    render() {
        const { time, name, label } = this.props;
        const keeperWrapperClass = cn('b-time-field__keeper-wrapper', {
            'show': this.state.displayTimepicker
        });

        return (
            <div className="b-time-field">
                    <div className={keeperWrapperClass}>
                        <TimePicker 
                            time={time}
                            onChange={(value) => this.onChange(value, name)}
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
