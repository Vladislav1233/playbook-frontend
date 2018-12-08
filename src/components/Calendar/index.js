import React, {Component} from 'react';
import Calendar from 'react-calendar';

// style
import '../../style/bem-blocks/b-date-calendar/index.scss';

class DateCalendar extends Component {

    static defaultProps = {
        value: [new Date(2018, 11, 9), new Date(2018, 11, 20)],
        minDate: new Date()
    };

    render() {
        return (
            <div className="b-date-calendar">
                <Calendar className="b-date-calendar__calendar"
                    minDetail='month'
                    {...this.props}
                />
            </div>
        )
    }
}

export default DateCalendar
