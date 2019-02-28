import React, { Component, Fragment } from 'react';
import { configPathRouter } from '../../App/configPathRouter';

// Note: components
import Button from '../ui-kit/Button/Button';

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';

// Note: styles
import '../../style/bem-blocks/b-object-card/index.scss';
import '../../style/bem-blocks/b-object-services/index.scss';


class ObjectCard extends Component {

    render() {
        const { trainerInfo } = this.props;
        const cost = () => {
            if (trainerInfo.trainer_info) {
                if (trainerInfo.trainer_info.min_price === trainerInfo.trainer_info.max_price) {
                    return convertTypeMoney(trainerInfo.trainer_info.min_price, 'RUB', 'banknote');
                } else {
                    return `${convertTypeMoney(trainerInfo.trainer_info.min_price, 'RUB', 'banknote')} - ${convertTypeMoney(trainerInfo.trainer_info.max_price, 'RUB', 'banknote')}`
                }
            }
        };

        const nameCourt = () => {
            return `${trainerInfo.playgrounds[0].organization ? `Организация: ${trainerInfo.playgrounds[0].organization},` : ''} Корт: ${trainerInfo.playgrounds[0].name}`;
        };

        const addressCourt = () => {
            return `${trainerInfo.playgrounds[0].address} ${trainerInfo.playgrounds.length > 1 ? `и ещё ${trainerInfo.playgrounds.length - 1} корт(а)`: ''}`
        }

        return(
            <div className="b-object-card">
                <div className="b-object-card__photo-wrapper">
                    {/* TODO: сделать добавление фото в ЛК */}
                    <img className="b-object-card__photo" src="https://dumskaya.net/pics/b6/picturepicture_150754124582004038201142_41715.jpg" alt="Фото тренера" />
                </div>

                <div className="b-object-card__info">
                    <div className="b-object-card__name-group">
                        <span className="b-object-card__first-name">{trainerInfo.first_name} </span>
                        <span className="b-object-card__last-name">{trainerInfo.last_name}</span>
                    </div>

                    {/* Обо мне */}
                    { trainerInfo.trainer_info && 
                        <Fragment>
                            <div className="b-object-card__info-block">
                                <p className="b-object-card__title">Обо мне:</p>
                                { trainerInfo.trainer_info.about }
                            </div>
                        </Fragment>
                    }

                    {/* TODO: интегрировать */}
                    {trainerInfo.playgrounds.length > 0 &&
                        <div className="b-object-card__info-block">
                            <p class="b-object-card__title">Тренерую:</p>
                            <ul className="b-object-card__list-place">
                                    <li className="b-object-card__item-place">{nameCourt()} ({addressCourt()})</li>
                                {/* TODO: добавить в ЛК поля для описания вида предоставляемых услуг по тренировкам */}
                                {/* <div className="b-object-service__info">
                                        <p>Детские, групповые, взрослые</p>
                                    </div> */}
                            </ul>
                        </div>
                    }


                    <div className="b-object-card__button">
                        {/* Цена */}
                        { trainerInfo.trainer_info &&
                            <Fragment>
                                <div className="b-object-card__info-block">
                                    {/* TODO: интегрировать валюту (список валют иметь и передавать переменную) */}
                                    <p className="b-object-card__title">Цена:</p>
                                    <span className="b-object-card__cost">
                                        {cost()} р./час
                                    </span>
                                </div>
                            </Fragment>
                        }
                        
                        <div className="b-object-card__button-item">
                            <Button to={`${configPathRouter.scheduleTrainer}/${trainerInfo.id}`} modif="b-button--orange b-button--full" name="Забронировать"/>
                        </div>
                        {/* TODO: Кнопку "подробнее выводить как будет раздел детальной о тренере" */}
                        {/* <div className="b-object-card__button-item">
                            <Button modif="b-button--orange b-button--full" name="Подробнее"/>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ObjectCard;