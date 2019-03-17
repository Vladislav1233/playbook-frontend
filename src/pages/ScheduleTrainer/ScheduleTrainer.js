import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';
import { withRouter } from 'react-router-dom';
import { trainerInfoService } from '../../services/trainerInfoService';

// component
import Schedule from '../../components/Schedule';
import Preloader from '../../components/Preloader/Preloader';

class ScheduleTrainer extends Component {

    state = {
        trainerInformation: null
    }

    componentDidMount() {
        const { getTrainerSchedule, location } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        // Note: userId достаем из url'a с помощью withRouter
        const userId = this.props.match.params.slug;
        getTrainerSchedule(userId, data);

        // Note: Запрашиваем информацию о тренере если роутер нам её не передал (к примеру если по прямой ссылке пришли.).
        if (!location.state) {
            trainerInfoService.getTrainerInformation(userId)
                .then(
                    res => {
                        this.setState({
                            trainerInformation: res.data.data
                        });
                    },
                    err => {
                        alert('Ошибка!');
                    }
                );
        };
    }

    render() {
        const { 
            scheduleTrainer, 
            getTrainerSchedule, 
            bookedTime, 
            playgroundsForTraining, 
            match,
            bookingPreloader,
            location
        } = this.props;

        console.log(this.props);

        const { 
            trainerInformation
        } = this.state;

        const noteTrainerInformation = () => {
            if(location.state) {
                return `${location.state.trainerInfo.first_name} ${location.state.trainerInfo.last_name}`
            } else if(trainerInformation) {
                return `${trainerInformation.first_name} ${trainerInformation.last_name}`
            };
        };

        // Note: userId достаем из url'a с помощью withRouter
        const userId = match.params.slug;

        return (
            <Fragment>
                <div className="container container--schedule-trainer">
                    <Schedule
                        schedule={scheduleTrainer}
                        template={'trainer'}
                        getTrainerSchedule={getTrainerSchedule}
                        userId={userId}
                        bookedTime={bookedTime}
                        cost={scheduleTrainer.cost}
                        playgroundsForTraining={playgroundsForTraining}
                        preloader={bookingPreloader}
                        titlePage="Расписание тренера"
                        noteTitle={noteTrainerInformation()}
                    />
                </div>

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
        * data - принимает объект с ключами start_time и end_time - период на который придёт расписание.
        */
        getTrainerSchedule: (userId, data) => dispatch(getTrainerSchedule(userId, data))
    }
};
  
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(ScheduleTrainer));

