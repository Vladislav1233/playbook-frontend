import React, {Component} from 'react';
import Calendar from 'react-calendar';

// style
import '../../style/bem-blocks/b-date-calendar/index.scss';

class DateCalendar extends Component {

    static defaultProps = {
        value: new Date(),
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
