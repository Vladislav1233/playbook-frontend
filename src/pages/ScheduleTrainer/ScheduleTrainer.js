import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';

// component
import Schedule from '../../components/Schedule';
import Preloader from '../../components/Preloader/Preloader';

class ScheduleTrainer extends Component {

    componentDidMount() {
        const { getTrainerSchedule } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        // TODO: брать из link наверное, в общем это от бэка будет приходить
        const userId = 1;
        getTrainerSchedule(userId, data);
    }

    render() {
        console.log(this.props);
        const { scheduleTrainer, getTrainerSchedule, bookedTime, playgroundsForTraining } = this.props;

        // Note: userId - это id пользователя (тренера) расписание которого надо получить, в нашем случае мы находимся в личном кабинете и запрашиваем свой id тренера
        // TODO: из бэка
        const userId = 1;

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
                />

                { this.props.preloader ? <Preloader /> : null }
            </Fragment>
        )
    }
}


const mapStateToProps = ({ scheduleTrainer }) => {
    return {
        // ЭТО НЕ НАДО -УДАЛИТЬ ИЗ РЕДЬЮСЕРА
        // scheduleTrainer: filterSchedule(store.scheduleTrainer.scheduleTrainer, store.getDayFilter),
        scheduleTrainer: scheduleTrainer.scheduleTrainer,
        bookedTime: scheduleTrainer.bookedTime,
        preloader: scheduleTrainer.preloader,
        playgroundsForTraining: scheduleTrainer.playgroundsForTraining
    }
};
  
const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * getTrainerSchedule - Запрос на получение расписания тренера
        * userId - id пользователя (тренера) расписание которого запрашиваем
        * data - принимает объект с ключами start_time и end_time - период на который прийдет расписание.
        */
        getTrainerSchedule: (userId, data) => dispatch(getTrainerSchedule(userId, data))
    }
};
  
export default connect(mapStateToProps, mapStateToDispatch)(ScheduleTrainer)
