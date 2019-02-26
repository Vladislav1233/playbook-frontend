import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';

// Note: action
import { createBooking } from '../../../store/actions/booking';

// Note: components
import Input from '../../ui-kit/Input/Input';
import InputMask from 'react-input-mask';
import Button from '../../ui-kit/Button/Button';
import Checkbox from '../../ui-kit/Checkbox/Checkbox';
import ModalComponent from '../index';

// Note: services
import { userService } from '../../../services/userService';

// Note: helpers
import telWithoutPlus from '../../../helpers/telWithoutPlus';
import calcCostService from '../../../helpers/calcCostService';

// Note: styles
import '../../../style/bem-blocks/b-booking-form/index.scss';
import '../../../style/bem-blocks/b-cost-information/index.scss';

class BookingModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start_time: '',
            end_time: '',
            first_name: '',
            last_name: '',
            phone: '',
            password: '',
            playgroundId: null
        }
    }

    onChangeInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    };

    onChangeRadio = e => {
        const { value } = e.target;

        this.setState({
            ...this.state,
            playgroundId: +value
        })
    }

    onGetNewPassword = (e) => {
        e.preventDefault();

        const dataRegister = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: telWithoutPlus(this.state.phone),
            is_trainer: 0
        };
        userService.register(dataRegister)
            .then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                }
            ); 
    };

    onCancel = (e) => {
        e.preventDefault();

        this.props.closeModal();

        this.setState({
            start_time: '',
            end_time: '',
            first_name: '',
            last_name: '',
            phone: '',
            password: '',
            playgroundId: null
        });
    }

    onSubmitBooking = (e) => {
        e.preventDefault();
        const { typeBooking, dateBooking, createBooking, isAuthorization } = this.props;
        const { start_time, end_time, playgroundId } = this.state;
        const { userId } = this.props;

        const data = {
            start_time: `${dateBooking} ${start_time}:00`,
            end_time: `${dateBooking} ${end_time}:00`,
            bookable_id: +userId
        };

        if (playgroundId) {
            data.playground_id = playgroundId
        };

        if(isAuthorization) {
            createBooking(typeBooking, data);
        } else {
            const dataLogin = {
                phone: telWithoutPlus(this.state.phone),
                password: this.state.password
            };
    
            userService.login(dataLogin)
                .then(() => {
                    createBooking(typeBooking, data);
                },
                err => {
                    console.log(err);
                });
        };
    };

    getCostPlaygroundForPayBooking = () => {
        const { playgroundsForTraining } = this.props;
        const { playgroundId } = this.state;
        let schedulePlayground = [];
        let costPlaygroundInRange = [];

        playgroundsForTraining.forEach(playgroundForTraining => {
            // eslint-disable-next-line
            if (playgroundForTraining.pivot.playground_id = playgroundId) {
                schedulePlayground = [ ...playgroundForTraining.schedules ]
            };
        });
        
        if (schedulePlayground.length > 0) {
            schedulePlayground.forEach(schedulePlaygroundItem => {
                const timeRangeCost = moment.range(schedulePlaygroundItem.start_time, schedulePlaygroundItem.end_time);
                costPlaygroundInRange.push({
                    time: timeRangeCost,
                    cost: schedulePlaygroundItem.price_per_hour
                });
            })
        }

        return costPlaygroundInRange;
    };

    render() {
        const { isOpenModal, closeModal, playgroundsForTraining, isAuthorization } = this.props;
        const { start_time, end_time, playgroundId } = this.state;

        let costPlaygroundForPayBooking = [];
        if (playgroundId) {
            costPlaygroundForPayBooking =  [ ...this.getCostPlaygroundForPayBooking() ];
        };
        

        const templateCost = (title, cost) => {
            
            const textCost = function() {
                if (cost > 0) {
                    return <NumberFormat 
                                value={cost} 
                                suffix=' ₽'
                                thousandSeparator={' '}
                                displayType='text'
                                decimalScale={0}
                            />

                } else if (cost === null) {
                    return 'Стоимость не указана администраторм, уточняйте лично.';

                } else if (cost <= 0) {
                    return 'Укажите верные временные рамки бронирования услуги.';
                };
            };

            return(
                <div className="b-cost-information">
                    <div className="b-cost-information__title">{title}</div>
                    <div className="b-cost-information__cost">{textCost()}</div>
                </div>
            )
        };

        return(
            <ModalComponent
                isOpenModal={isOpenModal}
                closeModal={closeModal}
                title='Бронирование'
            >
                <form className="b-booking-form">
                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Время</legend>
                        <Input 
                            labelText='С'
                            typeInput='time'
                            idInput='startBooking'
                            value={start_time}
                            nameInput='start_time'
                            theme={{blackColor: true}}
                            onChange={this.onChangeInput}
                            modif='b-input--time-booking'
                        />

                        <Input 
                            labelText='По'
                            typeInput='time'
                            idInput='endBooking'
                            value={end_time}
                            nameInput='end_time'
                            theme={{blackColor: true}}
                            onChange={this.onChangeInput}
                            modif='b-input--time-booking'
                        />
                    </fieldset>
                    
                    {/* TODO: радиобаттоны для корта */}
                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Корт</legend>
                        {playgroundsForTraining ? playgroundsForTraining.map(item => {
                            return (
                                <Checkbox 
                                    key={`playground_${item.pivot.playground_id}`}
                                    type='radio'
                                    name="playground"
                                    id={`playground_${item.pivot.playground_id}`}
                                    text={item.name}
                                    value={item.pivot.playground_id}
                                    checked={this.state.playgroundId === item.pivot.playground_id}
                                    onChange={this.onChangeRadio}
                                    modif={'b-checkbox--add-schedule'}
                                />
                            )
                        }): null}
                    </fieldset>
                    
                    <fieldset className="b-booking-form__fieldset">
                        {/* TODO: валидировать поле времени и если не проходит валидацию то и не выводим стоимость. */}
                        <legend className="b-modal__title-group">Стоимость</legend>

                        {start_time && end_time 
                            ? <Fragment>
                                {templateCost(
                                    'Оплата услуг тренера', 
                                    calcCostService(start_time, end_time, this.props.cost))}

                                {playgroundId 
                                    ? templateCost( 
                                        'Оплата услуг площадки', 
                                        calcCostService(start_time, end_time, costPlaygroundForPayBooking) )
                                    : null
                                }

                                {playgroundId && costPlaygroundForPayBooking.length > 0
                                    ? templateCost(
                                        'Итого к оплате', 
                                        +calcCostService(start_time, end_time, this.props.cost) + +calcCostService(start_time, end_time, costPlaygroundForPayBooking))
                                    : null
                                }
                            </Fragment>

                            : <p style={{marginBottom: '30px'}}>Укажите параметры бронирования</p>
                        }
                    </fieldset>

                    {!isAuthorization ?
                        <fieldset className="b-booking-form__fieldset">
                            <legend className="b-modal__title-group">Данные о вас</legend>

                            <Input 
                                labelText='Имя'
                                typeInput='text'
                                idInput='first_name'
                                value={this.state.first_name}
                                nameInput='first_name'
                                theme={{blackColor: true}}
                                onChange={this.onChangeInput}
                            />

                            <Input 
                                labelText='Фамилия'
                                typeInput='text'
                                idInput='last_name'
                                value={this.state.last_name}
                                nameInput='last_name'
                                theme={{blackColor: true}}
                                onChange={this.onChangeInput}
                            />

                            <div className="b-input b-input--black-color">
                                <label className="b-input__label" htmlFor="phone">Телефон</label>
                                <InputMask 
                                    className="b-input__input" 
                                    id="phone" 
                                    name="phone" 
                                    mask="+7 (999) 999-99-99" 
                                    maskChar={null} 
                                    value={this.state.phone} 
                                    onChange={this.onChangeInput} 
                                />
                            </div>

                            <div className="b-booking-form__note">
                                Введите свой пароль авторизации если он у вас есть или <a href="" title="получите новый пароль" onClick={this.onGetNewPassword}>получите новый пароль</a>.
                            </div>
                            <Input
                                labelText="Пароль"
                                typeInput="password"
                                idInput="password"
                                nameInput="password"
                                value={this.state.password}
                                theme={{blackColor: true}}
                                onChange={this.onChangeInput}
                            />
                        </fieldset>
                    : 
                        null
                    }

                    <div className="b-booking-form__button-wrapper">
                        <div className="b-booking-form__button">
                            <Button
                                name="Забронировать"
                                theme={{orange: true}}
                                onClick={e => this.onSubmitBooking(e)}
                                modif="b-button--full"
                            />
                        </div>

                        <div className="b-booking-form__button">
                            <Button
                                name="Отмена"
                                theme={{orange: true}}
                                onClick={this.onCancel}
                                modif="b-button--full"
                            />
                        </div>
                    </div>
                </form>
            </ModalComponent>
        )
    }
}

const mapStateToProps = ({ identificate }) => {
    return {
        isAuthorization: identificate.authorization
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        createBooking: (typeBooking, data) => dispatch(createBooking(typeBooking, data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(BookingModal);
