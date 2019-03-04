import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';
import { withRouter } from 'react-router-dom';

// component
import Schedule from '../../components/Schedule';
import Preloader from '../../components/Preloader/Preloader';

class ScheduleTrainer extends Component {

    componentDidMount() {
        const { getTrainerSchedule } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        // Note: userId достаем из url'a с помощью withRouter
        const userId = this.props.match.params.slug;
        getTrainerSchedule(userId, data);
    }

    render() {
        const { 
            scheduleTrainer, 
            getTrainerSchedule, 
            bookedTime, 
            playgroundsForTraining, 
            match,
            bookingPreloader 
        } = this.props;

        // Note: userId достаем из url'a с помощью withRouter
        const userId = match.params.slug;

        return (
            <Fragment>
                <Schedule
                    schedule={scheduleTrainer}
                    template={'trainer'}
                    getTrainerSchedule={getTrainerSchedule}
                    userId={userId}
                    bookedTime={bookedTime}
                    cost={scheduleTrainer.cost}
                    playgroundsForTraining={playgroundsForTraining}
                    preloader={bookingPreloader}
                />

                { this.props.preloader ? <Preloader /> : null }
            </Fragment>
        )
    }
}


const mapStateToProps = ({ scheduleTrainer, booking }) => {
    return {
        scheduleTrainer: scheduleTrainer.scheduleTrainer,
        bookedTime: scheduleTrainer.bookedTime,
        playgroundsForTraining: scheduleTrainer.playgroundsForTraining,
        preloader: scheduleTrainer.preloader,
        bookingPreloader: booking.preloader
    }
};
  
const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * getTrainerSchedule - Запрос на получение расписания тренера
        * userId - uuid пользователя (тренера) расписание которого запрашиваем
        * data - принимает объект с ключами start_time и end_time - период на который прийдет расписание.
        */
        getTrainerSchedule: (userId, data) => dispatch(getTrainerSchedule(userId, data))
    }
};
  
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(ScheduleTrainer));
