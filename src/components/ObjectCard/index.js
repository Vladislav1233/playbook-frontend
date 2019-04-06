import React, { Component, Fragment } from 'react';
import { configPathRouter } from '../../App/configPathRouter';
import { Link } from "react-router-dom";

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
                }
                    return `${convertTypeMoney(trainerInfo.trainer_info.min_price, 'RUB', 'banknote')} - ${convertTypeMoney(trainerInfo.trainer_info.max_price, 'RUB', 'banknote')}`

            }
        };

        // const nameCourt = () => {
        //     return `${trainerInfo.playgrounds[0].organization ? `Организация: ${trainerInfo.playgrounds[0].organization},` : ''} Корт: ${trainerInfo.playgrounds[0].name}`;
        // };

        const nameCourtString = () => {
            if (trainerInfo.playgrounds.length > 1) {
                const courtsSting = [];
                trainerInfo.playgrounds.forEach((e, i) => {
                    (i === 0)
                    ? courtsSting.push(`${e.name}`)
                    : courtsSting.push(`, ${e.name}`)
                });
                return courtsSting;
            }
                return `${trainerInfo.playgrounds[0].name}`;

        };

        // const addressCourt = () => {
        //     return `${trainerInfo.playgrounds[0].address} ${trainerInfo.playgrounds.length > 1 ? `и ещё ${trainerInfo.playgrounds.length - 1} корт(а)`: ''}`
        // }

        const linkTo = {
            pathname: `${configPathRouter.scheduleTrainer}/${trainerInfo.uuid}`,
            state: {
                trainerInfo: trainerInfo
            }
        };

        // console.log(trainerInfo);

        return(
            <div className="b-object-card">
                <div className="b-object-card__photo-wrapper">
                    {/* TODO: сделать добавление фото в ЛК */}
                    {trainerInfo.image
                        ? <img className="b-object-card__photo" src={trainerInfo.image} alt="Фото тренера" />
                        : null
                    }
                </div>

                <div className="b-object-card__info">
                    <Link className="b-object-card__name-group" to={linkTo}>
                        <span className="b-object-card__first-name">{trainerInfo.first_name} </span>
                        <span className="b-object-card__last-name">{trainerInfo.last_name}</span>
                        {/* TODO_VLAD: если есть рассписание на сегодня от текущего времени до конца дня, пока так */}
                        {/* <i className="b-object-card__online-status" title="Тренер доступен сегодня"></i> */}
                    </Link>

                    {/* Настройка профиля */}
                    { trainerInfo.trainer_info && trainerInfo.trainer_info.about &&
                        <Fragment>
                            <div className="b-object-card__info-block">
                                <p className="b-object-card__title">Обо мне:</p>
                                { trainerInfo.trainer_info.about }
                            </div>
                        </Fragment>
                    }

                    {/* TODO: интегрировать */}
                    {/* <li className="b-object-card__item-place">{nameCourt()} ({addressCourt()})</li> */}
                    {/* TODO: добавить в ЛК поля для описания вида предоставляемых услуг по тренировкам */}
                    {/* <div className="b-object-service__info">
                    <p>Детские, групповые, взрослые</p>
                    </div> */}
                    {trainerInfo.playgrounds.length > 0 &&
                        <div className="b-object-card__info-block">
                            <p className="b-object-card__title">
                                {(trainerInfo.playgrounds.length > 1)
                                 ? "Корты:"
                                 : "Корт:"
                                }
                            </p>
                            <ul className="b-object-card__list-place">
                                <li className="b-object-card__item-place">{nameCourtString()}</li>
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
                            <Button to={linkTo} modif="b-button--hollow b-button--full" name="Забронировать"/>
                        </div>
                        {/* TODO: Кнопку "подробнее выводить как будет раздел детальной о тренере" */}
                        {/* <div className="b-object-card__button-item">
                            <Button modif="b-button--hollow b-button--full" name="Подробнее"/>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ObjectCard;