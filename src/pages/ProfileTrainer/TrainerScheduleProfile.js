import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';

// Note: component
import Schedule from '../../components/Schedule/Schedule';
import Preloader from '../../components/Preloader/Preloader';

// Note: style
import '../../style/bem-blocks/b-trainer-schedule-profile/index.scss';

class TrainerScheduleProfile extends Component {

    componentDidMount() {
        const { getTrainerSchedule } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        const userId = localStorage.getItem('userId');
        getTrainerSchedule(userId, data);
    }

    render() {
        const { scheduleTrainer, getTrainerSchedule } = this.props;

        console.log(this.props);
        
        // Note: userId - это id пользователя (тренера) расписание которого надо получить, в нашем случае мы находимся в личном кабинете и запрашиваем свой id тренера
        const userId = localStorage.getItem('userId');

        return(
            <div className="b-trainer-schedule-profile">
                <Schedule 
                    schedule={scheduleTrainer}
                    template={'trainer'}
                    getTrainerSchedule={getTrainerSchedule}
                    userId={userId}
                />

                { this.props.preloader ? <Preloader /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ scheduleTrainer }) => {
    return {
        scheduleTrainer: scheduleTrainer.scheduleTrainer,
        preloader: scheduleTrainer.preloader
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * getTrainerSchedule - Запрос на получение расписания тренера
        * userId - id пользователя (тренера) расписание которого запрашиваем
        * data - принимает объект с ключами start_time и end_time - период на который прийдет расписание.
        */
        getTrainerSchedule: (userId, data) => dispatch(getTrainerSchedule(userId, data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerScheduleProfile);