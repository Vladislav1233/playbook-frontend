import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Note: actions
import { getTrainerInfo } from '../../../store/actions/getTrainerInfo';

// Note: components
import Button from '../../../components/ui-kit/Button/Button';
import Preloader from '../../../components/Preloader/Preloader';

// Note: styles
import '../../../style/bem-blocks/b-list-trainer/index.scss';
import '../../../style/bem-blocks/b-object-card/index.scss';

class ManagePlaygroundsList extends Component {

    componentDidMount() {
        const { userId, getTrainerInfoAction } = this.props;
        getTrainerInfoAction(userId);
    };

    render() {
        const { trainerInfo, preloader } = this.props;

        return(
        <div className="b-list-trainer">
            <div className="container">
                <h1 className="b-list-trainer__heading">
                    Управление площадками
                </h1>

                <ul className="b-list-trainer__list">
                    {trainerInfo && trainerInfo.playgrounds.length > 0 ? trainerInfo.playgrounds.map(playground => {
                        return <li key={playground.uuid} className="b-list-trainer__item">
                            <div className="b-object-card">
                                <div className="b-object-card__photo-wrapper">
                                    <img className="b-object-card__photo" src='https://pp.userapi.com/c624421/v624421853/2da9f/F0drNkjzT3A.jpg' alt="Фото тренера" />
                                </div>

                                <div className="b-object-card__info">
                                    <Link 
                                        className="b-object-card__name-group" 
                                        to={`/profile/manage-playground/${playground.uuid}`}
                                    >
                                        <span className="b-object-card__first-name">{playground.name}</span>
                                    </Link>

                                    <div className="b-object-card__button">
                                        <div className="b-object-card__button-item">
                                            <Button to={ `/profile/manage-playground/${playground.uuid}` } modif="b-button--hollow b-button--full">Управлять</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </li>
                    }) : <p style={{display: 'block'}} className="b-booking-request__item">Добавьте информацию о кортах, на которых работаете в разделе <Link className="b-add-schedule-card__link" to='/profile/trainer-info'>"Обо мне"</Link></p>}
                </ul>
            </div>

            {preloader ? <Preloader /> : null}
        </div>
        )
    }
}

const mapStateToProps = ({ identificate, trainerInfo }) => {
    return {
        userId: identificate.userId,
        trainerInfo: trainerInfo.trainerInformation,
        preloader: trainerInfo.preloader
    }
};

const mapStateToDispatch = dispatch => {
    return {
        getTrainerInfoAction: (userId) => dispatch(getTrainerInfo(userId))
    }
};

export default connect(mapStateToProps, mapStateToDispatch)(ManagePlaygroundsList);