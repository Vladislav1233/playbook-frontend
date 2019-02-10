import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';
import { declineBooking } from '../../store/actions/booking';

// Note: component
import Schedule from '../../components/Schedule';
import Preloader from '../../components/Preloader/Preloader';

// Note: style
import '../../style/bem-blocks/b-trainer-schedule-profile/index.scss';

class TrainerScheduleProfile extends Component {

    componentDidMount() {
        const { getTrainerSchedule } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        const { userId } = this.props;
        getTrainerSchedule(userId, data);
    }

    onClickDecline = (bookingId, note) => {
        const data = {
            note
        };
        this.props.declineBooking(bookingId, data);
    }

    render() {
        const { scheduleTrainer, getTrainerSchedule, bookedTime, playgroundsForTraining } = this.props;
        
        // Note: userId - это id пользователя (тренера) расписание которого надо получить, в нашем случае мы находимся в личном кабинете и запрашиваем свой id тренера
        const { userId } = this.props;

        return(
            <div className="b-trainer-schedule-profile">
                <Schedule 
                    schedule={scheduleTrainer}
                    template={'trainer'}
                    getTrainerSchedule={getTrainerSchedule}
                    userId={userId}
                    bookedTime={bookedTime}
                    cost={scheduleTrainer.cost}
                    playgroundsForTraining={playgroundsForTraining}
                    isWhoBooked={true}
                    onClickDecline={this.onClickDecline}
                />

                { this.props.preloader ? <Preloader /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ scheduleTrainer, identificate }) => {
    return {
        scheduleTrainer: scheduleTrainer.scheduleTrainer,
        bookedTime: scheduleTrainer.bookedTime,
        preloader: scheduleTrainer.preloader,
        playgroundsForTraining: scheduleTrainer.playgroundsForTraining,
        userId: identificate.userId
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * getTrainerSchedule - Запрос на получение расписания тренера
        * userId - id пользователя (тренера) расписание которого запрашиваем
        * data - принимает объект с ключами start_time и end_time - период на который прийдет расписание.
        */
        getTrainerSchedule: (userId, data) => dispatch(getTrainerSchedule(userId, data)),
        /*
        * Отменить бронирование
        * bookingId - id объекта бронирования
        * data: {
        *   note: 'Сообщение пользователю'
        *}
        */
       declineBooking: (bookingId, data) => dispatch(declineBooking(bookingId, data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerScheduleProfile);