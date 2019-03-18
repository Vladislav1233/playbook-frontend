import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import cn from 'classnames';
import { ANALIZE_DATE_TIME_ZONE } from '../../../store/constants/formatDates';

// Note: action
import { createBooking } from '../../../store/actions/booking';
import { userActions } from '../../../store/actions/userAction';

// Note: components
import Input from '../../ui-kit/Input/Input';
import TimeField from '../../ui-kit/TimeField';
import InputMask from 'react-input-mask';
import Button from '../../ui-kit/Button/Button';
import ModalComponent from '../index';
import Radio from '../../ui-kit/Radio';

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
            playgroundId: null,
            registeredNewUser: false,
            showFileldPassword: false,
            
            errorHandler: {
                start_time: '',
                end_time: ''
            }
        };

        this.initialState = this.state;
    };

    onChangeInput = (e, valueCallBack, errorObject) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value,
            errorHandler: {
                ...this.state.errorHandler,
                [name]: errorObject ? errorObject.errorText : ''
            }
        });
    };

    onChangeRadio = e => {
        const { value } = e.target;

        this.setState({
            ...this.state,
            playgroundId: value === 'playground_other' ? null : value
        })
    };

    onRegisterUser = (e) => {
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
                    this.setState({
                        registeredNewUser: true,
                        showFileldPassword: true
                    });
                    localStorage.setItem('userToken', res.data.data.access_token);
                },
                err => {
                    if(err.response.data.phone && err.response.data.phone[0] === "Такое значение поля мобильный номер уже существует.") {
                        this.setState({
                            registeredNewUser: false,
                            showFileldPassword: true
                        });
                    };
                    console.log(err.response.data);
                }
            ); 
    };

    onCancel = (e) => {
        if(e) {
            e.preventDefault();
        }

        this.props.closeModal();

        this.setState(this.initialState);

        if (!localStorage.getItem('userRole') && localStorage.getItem('userToken')) {
            localStorage.removeItem('userToken');
        };
    };

    onSubmitBooking = (e) => {
        e.preventDefault();
        const { typeBooking, dateBooking, createBooking, isAuthorization, loginAction } = this.props;
        const { start_time, end_time, playgroundId, errorHandler } = this.state;

        const isValidTime = Object.keys(errorHandler).some(errorItem => {
            if(errorHandler[errorItem]) {
                return true
            };
            return false
        });
        if(isValidTime) return;
 
        const { userId } = this.props;
        const formatDate = 'YYYY-MM-DD HH:mm:ss';

        /* Note: data - Формируем данные для запроса бронирования 
        * В запросе данные даты и времени переводим в UTC формат.
        */
        const data = {
            start_time: moment(`${dateBooking} ${start_time}:00`).utc().format(formatDate),
            end_time: moment(`${dateBooking} ${end_time}:00`).utc().format(formatDate),
            bookable_uuid: userId
        };

        if (playgroundId) {
            data.playground_uuid = playgroundId
        };

        if(isAuthorization) {
            createBooking(typeBooking, data);
            this.onCancel();
        } else {
            const dataLogin = {
                phone: telWithoutPlus(this.state.phone),
                password: this.state.password
            };
            loginAction(dataLogin, false, () => {
                createBooking(typeBooking, data); 
                this.onCancel();
            }).then(() => { this.onCancel(); });
        };
    };

    getCostPlaygroundForPayBooking = () => {
        const { playgroundsForTraining } = this.props;
        const { playgroundId } = this.state;
        let schedulePlayground = [];
        let costPlaygroundInRange = [];

        playgroundsForTraining.forEach(playgroundForTraining => {
            // eslint-disable-next-line
            if (playgroundForTraining.pivot.playground_uuid = playgroundId) {
                schedulePlayground = [ ...playgroundForTraining.schedules ]
            };
        });
        
        if (schedulePlayground.length > 0) {
            schedulePlayground.forEach(schedulePlaygroundItem => {
                // TODO: проверить как будет работать дата в ios устройствах.
                const timeRangeCost = moment.range(
                    schedulePlaygroundItem.start_time, 
                    schedulePlaygroundItem.end_time
                );
                costPlaygroundInRange.push({
                    time: timeRangeCost,
                    cost: schedulePlaygroundItem.price_per_hour
                });
            })
        }

        return costPlaygroundInRange;
    };

    render() {
        const { 
            isOpenModal, 
            closeModal, 
            playgroundsForTraining, 
            isAuthorization, 
            dateBooking,
            resetPasswordRequest
        } = this.props;

        const { 
            start_time, 
            end_time, 
            playgroundId, 
            showFileldPassword, 
            registeredNewUser,
            errorHandler
        } = this.state;

        let costPlaygroundForPayBooking = [];
        if (playgroundId) {
            costPlaygroundForPayBooking =  [ ...this.getCostPlaygroundForPayBooking() ];
        };

        const textErrorForTime = () => {
            if(errorHandler.start_time) {
                return errorHandler.start_time
            } else if(errorHandler.end_time) {
                return errorHandler.end_time
            };
        };

        const numberCost = (cost) => {
            if (!cost) {
                return '--'
            }

            return <NumberFormat
                value={cost}
                suffix=' ₽'
                thousandSeparator={' '}
                displayType='text'
                decimalScale={0}
            />
        };

        // Сейчас проверка цены корта
        const validCheck = (cost) => {
            if (cost === null) {
                return 'Стоимость данного корта не указана администратором, уточняйте лично.';
            }
        };

        // проверка валидности цены тренера (1 пункт)
        const validCheckTrainer = () => {
            // console.log(start_time, end_time);
            // console.log(dateBooking);
            if (!!start_time && !!end_time && (calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, this.props.cost) <= 0)) {
                return 'negativeSumm';
            }
            return false;
        };

        const cssClassTimeWrap = cn(
            'b-booking-form__fieldset',
            {
                'b-booking-form__fieldset--error': (validCheckTrainer() === 'negativeSumm')
            }
        );

        return(
            <ModalComponent
                isOpenModal={isOpenModal}
                closeModal={() => {
                    closeModal()
                    this.onCancel()
                }}
                title='Бронирование'
                subTitle={`с ${moment(this.props.startTime, ANALIZE_DATE_TIME_ZONE).format('HH:mm')} до ${moment(this.props.endTime, ANALIZE_DATE_TIME_ZONE).format('HH:mm')}`}
            >
                <form className="b-booking-form">
                    <fieldset className={ cssClassTimeWrap }>
                        <legend className="b-modal__title-group">Время</legend>

                        <TimeField 
                            labelText='С'
                            typeInput='time'
                            idInput='startBooking'
                            nameInput='start_time'
                            theme={{blackColor: true}}
                            onChangeTimeField={this.onChangeInput}
                            modif='b-input--time-booking'
                        />

                        <TimeField 
                            labelText='С'
                            typeInput='time'
                            idInput='endBooking'
                            nameInput='end_time'
                            theme={{blackColor: true}}
                            onChangeTimeField={this.onChangeInput}
                            modif='b-input--time-booking'
                        />
                        
                        {textErrorForTime 
                            ? <p className="b-booking-form__error">
                                {textErrorForTime()}
                            </p> 
                            : null
                        }
                    </fieldset>

                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Корт</legend>
                        <Radio
                            key='playground_other'
                            name='playground'
                            id='playground_other'
                            text='Другое'
                            value='playground_other'
                            checked={playgroundId === null || playgroundId === 'playground_other'}
                            onChange={this.onChangeRadio}
                        />

                        {playgroundsForTraining ? playgroundsForTraining.map(item => {
                            return (
                                <Radio
                                    key={`playground_${item.pivot.playground_uuid}`}
                                    name="playground"
                                    id={`playground_${item.pivot.playground_uuid}`}
                                    text={item.name}
                                    value={item.pivot.playground_uuid}
                                    checked={this.state.playgroundId === item.pivot.playground_uuid}
                                    onChange={this.onChangeRadio}
                                />
                            )
                        }): null}
                    </fieldset>
                    
                    <fieldset className="b-booking-form__fieldset">
                        {/* TODO: валидировать поле времени и если не проходит валидацию то и не выводим стоимость. */}
                        <legend className="b-modal__title-group">Стоимость</legend>
                        {/* TODO_HOT: сразу показывать общую стоимость из суммы */}
                        {start_time && end_time 
                            ? <Fragment>
                                <div className="b-cost-information b-cost-information--total">
                                    <div className="b-cost-information__title">Итого:</div>
                                    
                                    {/* TODO_AMED: добавить "более" для корта без цены */}
                                    <div className="b-cost-information__cost">
                                        { playgroundId ? 'Более ' : ''}
                                        { numberCost(
                                            +calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, this.props.cost)
                                            +
                                            +calcCostService(`${dateBooking} ${start_time}:00`, `${dateBooking} ${end_time}`, costPlaygroundForPayBooking)
                                        )}
                                    </div>
                                </div>
                                {/* { templateCost(
                                        'Итого к оплате',
                                        +calcCostService(`${dateBooking} ${start_time}`,
                                        `${dateBooking} ${end_time}`, this.props.cost)
                                        + +calcCostService(`${dateBooking} ${start_time}:00`,
                                        `${dateBooking} ${end_time}`, costPlaygroundForPayBooking)
                                )} */}

                                <div className="b-cost-information">
                                    <div className="b-cost-information__title">Услуги тренера</div>
                                    <div className="b-cost-information__cost">
                                        { numberCost(
                                            calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, this.props.cost)
                                        )}
                                    </div>
                                </div>

                                <div className="b-cost-information">
                                    <div className="b-cost-information__title">Аренда корта</div>
                                    <div className="b-cost-information__cost">
                                        { playgroundId
                                            ? numberCost(calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, costPlaygroundForPayBooking))
                                            : '0 ₽'
                                        }
                                    </div>
                                </div>
                            </Fragment>
                            : <p>Будет расчитанна автоматически</p>
                        }
                    </fieldset>

                    {!isAuthorization ?
                        <fieldset className="b-booking-form__fieldset">
                            <legend className="b-modal__title-group">Данные о вас</legend>

                            {showFileldPassword ?
                                <Fragment>
                                    {registeredNewUser 
                                        ? <div className="b-booking-form__note">
                                            На ваш номер телефона выслан пароль. Введите его в поле ниже, а затем нажми кнопку <i>"Подтвердить"</i>.
                                            <br/>
                                            Пароль можно использовать повторно для авторизации в системе по вашему номеру телефона.
                                        </div>

                                        : <div className="b-booking-form__note">
                                            Вы уже зарегистрированный пользователь.
                                            <br/>
                                            Введите свой пароль авторизации или 
                                            <a className="link-in-text-white" href="" title="" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    resetPasswordRequest({
                                                        phone: telWithoutPlus(this.state.phone)
                                                    })
                                                }
                                            }> запросите новый пароль</a>.
                                        </div> 
                                    }
                                    <Input
                                        // labelText="Пароль"
                                        typeInput="password"
                                        placeholder="Введите пароль"
                                        idInput="password"
                                        nameInput="password"
                                        value={this.state.password}
                                        theme={{blackColor: true}}
                                        onChange={this.onChangeInput}
                                    />
                                </Fragment>
                            : 
                                <Fragment>
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
                                </Fragment>
                            }
                        </fieldset>
                    : 
                        null
                    }

                    { (validCheckTrainer() === 'negativeSumm') &&
                        <p className="b-booking-form__error"> Укажите верные временные рамки бронирования услуги. </p>
                    }

                    { !!playgroundId && 
                        <p className="b-booking-form__error">
                            {validCheck( calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, costPlaygroundForPayBooking) )}
                        </p>
                    }

                    <div className="b-booking-form__button-wrapper">
                        <div className="b-booking-form__button">
                            <Button
                                name={!showFileldPassword ? "Забронировать" : "Подтвердить"}
                                onClick={e => {
                                    if (!showFileldPassword && !isAuthorization) {
                                        this.onRegisterUser(e);
                                    } else {
                                        this.onSubmitBooking(e);
                                    }
                                }}
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
        createBooking: (typeBooking, data) => dispatch(createBooking(typeBooking, data)),
        loginAction: (data, toMain, callback) => dispatch(userActions.login(data, toMain, callback)),
        resetPasswordRequest: (data) => dispatch(userActions.resetPasswordRequest(data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(BookingModal);
