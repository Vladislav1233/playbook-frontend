import React, { Component } from 'react';

// Note: components
import Button from '../ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-object-card/index.scss';
import '../../style/bem-blocks/b-object-services/index.scss';


class ObjectCard extends Component {
    render() {
        return(
            <div className="b-object-card">
                <div className="b-object-card__header">
                    <div className="b-object-card__photo-wrapper">
                        <img className="b-object-card__photo" src="https://dumskaya.net/pics/b6/picturepicture_150754124582004038201142_41715.jpg" />
                    </div>
                </div>

                <div className="b-object-card__info">
                    <div className="b-object-card__name-group">
                        <span className="b-object-card__first-name">Елена </span>
                        <span className="b-object-card__last-name">Намунка</span>
                    </div>

                    <div className="b-object-card__about">
                        <p>Привет, я лучший в городе тренер по теннису! Мой опыт больше 10 лет и я выиграла больше 30 турниров за свою карьеру.</p>
                    </div>

                    <div className="b-cost-information b-cost-information--list-trainer">
                        <div className="b-cost-information__cost b-cost-information__cost--list-trainer">700 р./час</div>
                    </div>
                </div>

                <ul className="b-object-service">
                    <li className="b-object-service__item">
                        <div className="b-object-service__icon">
                            <svg viewBox="64 64 896 896" class="" data-icon="environment" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M854.6 289.1a362.49 362.49 0 0 0-79.9-115.7 370.83 370.83 0 0 0-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 0 0 169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0 0 22.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"></path></svg>
                        </div>

                        <div className="b-object-services__info">
                            <div className="b-object-services__training-playground">Lawn tennis</div>
                            <div className="b-object-services__playground-additional">Октябрская, 22а и ещё 3 корт(а)</div>
                        </div>
                    </li>

                    <li className="b-object-service__item">
                        <div className="b-object-service__icon">
                            <svg viewBox="64 64 896 896" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>
                        </div>

                        <div className="b-object-service__info">
                            <p>Детские, групповые, взрослые</p>
                        </div>
                    </li>
                </ul>

                <div className="b-object-card__button">
                    <div className="b-object-card__button-item">
                        <Button name="Забронировать"/>
                    </div>
                    <div className="b-object-card__button-item">
                        <Button name="Подробнее"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ObjectCard;