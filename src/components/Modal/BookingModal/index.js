import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import cn from 'classnames';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
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
import { required } from '../../../helpers/validate';

// Note: styles
import '../../../style/bem-blocks/b-booking-form/index.scss';
import '../../../style/bem-blocks/b-cost-information/index.scss';

class BookingModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playgroundId: null,
            registeredNewUser: false,
            showFileldPassword: false
        };

        this.initialState = this.state;
    };

    onRegisterUser = ({ first_name, last_name, phone }) => {

        const dataRegister = {
            first_name,
            last_name,
            phone: telWithoutPlus(phone),
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

        if (!localStorage.getItem('userRole') && localStorage.getItem('userToken')) {
            localStorage.removeItem('userToken');
        };
    };

    onSubmitBooking = (values) => {
        console.log(values);
        const { typeBooking, dateBooking, createBooking, isAuthorization, loginAction } = this.props;
        const { start_time, end_time, playground } = values;
        const playgroundId = playground === 'playground_other' ? null : playground;
 
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
                phone: telWithoutPlus(values.phone),
                password: values.password
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
            playgroundId,
            showFileldPassword, 
            registeredNewUser
        } = this.state;

        let costPlaygroundForPayBooking = [];
        if (playgroundId) {
            costPlaygroundForPayBooking =  [ ...this.getCostPlaygroundForPayBooking() ];
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
        // const validCheckTrainer = () => {
        //     // console.log(start_time, end_time);
        //     // console.log(dateBooking);
        //     if (!!start_time && !!end_time && (calcCostService(`${dateBooking} ${start_time}`, `${dateBooking} ${end_time}`, this.props.cost) <= 0)) {
        //         return 'negativeSumm';
        //     }
        //     return false;
        // };

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
                <Form 
                    onSubmit={(values) => {
                        if (!showFileldPassword && !isAuthorization) {
                            this.onRegisterUser(values);
                        } else {
                            this.onSubmitBooking(values);
                        }
                    }}
                    initialValues={{
                        playground: 'playground_other'
                    }}
                    render={({ handleSubmit, values, errors, touched }) => {
                        console.log(values);
                        return (
                            <form onSubmit={handleSubmit} className="b-booking-form">
                                <fieldset className={ cn('b-booking-form__fieldset', {
                                    'b-booking-form__fieldset--error': (errors.start_time && touched.start_time) || (errors.end_time && touched.end_time)
                                })}>
                                    <legend className="b-modal__title-group">Время</legend>
                                    <Field 
                                        name='start_time'
                                        validate={(value) => required(value)}
                                        render={({ input }) => {
                                            return <TimeField 
                                                {...input}
                                                labelText='С'
                                                typeInput='time'
                                                idInput='startBooking'
                                                nameInput={input.name}
                                                theme={{blackColor: true}}
                                                modif='b-input--time-booking'
                                            />
                                        }}
                                    />

                                    <Field 
                                        name='end_time'
                                        validate={(value) => required(value)}
                                        render={({ input }) => {
                                            return <TimeField 
                                                { ...input }
                                                labelText='По'
                                                typeInput='time'
                                                idInput='endBooking'
                                                nameInput={input.name}
                                                theme={{blackColor: true}}
                                                modif='b-input--time-booking'
                                            />
                                        }}
                                    />
                                    {errors.start_time && touched.start_time  
                                        ? <p className="b-booking-form__error">
                                            {errors.start_time}
                                        </p> 
                                        : errors.end_time && touched.end_time
                                        ? <p className="b-booking-form__error">
                                            {errors.end_time}
                                        </p> 
                                        : null  
                                    }

                                </fieldset>

                                <fieldset className="b-booking-form__fieldset">
                                    <legend className="b-modal__title-group">Корт</legend>
                                    <Field 
                                        name='playground'
                                        value='playground_other'
                                        type='radio'
                                        render={({ input }) => {
                                            return <Radio
                                                id='playground_other'
                                                text='Другое'
                                                {...input}
                                            />
                                        }}
                                    />

                                    {playgroundsForTraining ? playgroundsForTraining.map(item => {
                                        return <Field 
                                                key={`playground_${item.pivot.playground_uuid}`}
                                                name='playground'
                                                value={item.pivot.playground_uuid}
                                                type='radio'
                                                render={({ input }) => {
                                                    return <Radio
                                                        id={`playground_${item.pivot.playground_uuid}`}
                                                        text={item.name}
                                                        {...input}
                                                    />
                                                }}
                                            />
                                    }): null}
                                    <OnChange 
                                        name="playground"
                                        children={value => {
                                            this.setState({
                                                playgroundId: value === 'playground_other' ? null : value
                                            });
                                        }} 
                                    />
                                </fieldset>
                                
                                <fieldset className="b-booking-form__fieldset">
                                    {/* TODO: валидировать поле времени и если не проходит валидацию то и не выводим стоимость. */}
                                    <legend className="b-modal__title-group">Стоимость</legend>
                                    {/* TODO_HOT: сразу показывать общую стоимость из суммы */}
                                    {values.start_time && values.end_time 
                                        ? <Fragment>
                                            <div className="b-cost-information b-cost-information--total">
                                                <div className="b-cost-information__title">Итого:</div>
                                                
                                                {/* TODO_AMED: добавить "более" для корта без цены */}
                                                <div className="b-cost-information__cost">
                                                    { playgroundId ? 'Более ' : ''}
                                                    { numberCost(
                                                        +calcCostService(`${dateBooking} ${values.start_time}`, `${dateBooking} ${values.end_time}`, this.props.cost)
                                                        +
                                                        +calcCostService(`${dateBooking} ${values.start_time}:00`, `${dateBooking} ${values.end_time}`, costPlaygroundForPayBooking)
                                                    )}
                                                </div>
                                            </div>

                                            <div className="b-cost-information">
                                                <div className="b-cost-information__title">Услуги тренера</div>
                                                <div className="b-cost-information__cost">
                                                    { numberCost(
                                                        calcCostService(`${dateBooking} ${values.start_time}`, `${dateBooking} ${values.end_time}`, this.props.cost)
                                                    )}
                                                </div>
                                            </div>

                                            <div className="b-cost-information">
                                                <div className="b-cost-information__title">Аренда корта</div>
                                                <div className="b-cost-information__cost">
                                                    { playgroundId
                                                        ? numberCost(calcCostService(`${dateBooking} ${values.start_time}`, `${dateBooking} ${values.end_time}`, costPlaygroundForPayBooking))
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
                                                                    phone: telWithoutPlus(values.phone)
                                                                })
                                                            }
                                                        }> запросите новый пароль</a>.
                                                    </div> 
                                                }

                                                <Field 
                                                    name='password'
                                                    validate={(value) => required(value)}
                                                    render={({ input, meta }) => {
                                                        return <Input
                                                            // labelText="Пароль"
                                                            typeInput="password"
                                                            placeholder="Введите пароль"
                                                            idInput="password"
                                                            nameInput={input.name}
                                                            theme={{blackColor: true}}
                                                            error={meta.error}
                                                            { ...input }
                                                        />      
                                                    }}
                                                />
                                            </Fragment>
                                        : 
                                            <Fragment>
                                                <Field 
                                                    name='first_name'
                                                    validate={(value) => required(value)}
                                                    render={({ input, meta }) => {
                                                        return <Input 
                                                            labelText='Имя'
                                                            typeInput='text'
                                                            idInput='first_name'
                                                            nameInput={input.name}
                                                            theme={{blackColor: true}}
                                                            error={meta.error && meta.touched && meta.error}
                                                            {...input}
                                                        />
                                                    }}
                                                />

                                                <Field 
                                                    name='last_name'
                                                    validate={(value) => required(value)}
                                                    render={({ input, meta }) => {
                                                        return <Input 
                                                            labelText='Фамилия'
                                                            typeInput='text'
                                                            idInput='last_name'
                                                            nameInput='last_name'
                                                            theme={{blackColor: true}}
                                                            error={meta.error && meta.touched && meta.error}
                                                            { ...input }
                                                        />
                                                    }}
                                                />

                                                <div className={cn("b-input b-input--black-color", {
                                                    'error': errors.phone && touched.phone
                                                })}>
                                                    <label className="b-input__label" htmlFor="phone">Телефон</label>
                                                    <Field 
                                                        name='phone'
                                                        validate={(value) => required(value)}
                                                        render={({ input, meta }) => {
                                                            return <Fragment>
                                                                <InputMask 
                                                                    className='b-input__input'
                                                                    id="phone" 
                                                                    mask="+7 (999) 999-99-99" 
                                                                    maskChar={null} 
                                                                    { ...input } 
                                                                />
                                                                {meta.error && meta.touched &&
                                                                    <p className="b-input__error">
                                                                        {meta.error}
                                                                    </p>
                                                                }
                                                            </Fragment>
                                                        }}
                                                    />
                                                </div>
                                            </Fragment>
                                        }
                                    </fieldset>
                                : 
                                    null
                                }

                                {/* { (validCheckTrainer() === 'negativeSumm') &&
                                    <p className="b-booking-form__error"> Укажите верные временные рамки бронирования услуги. </p>
                                } */}

                                { !!playgroundId && 
                                    <p className="b-booking-form__error">
                                        {validCheck( calcCostService(`${dateBooking} ${values.start_time}`, `${dateBooking} ${values.end_time}`, costPlaygroundForPayBooking) )}
                                    </p>
                                }

                                <div className="b-booking-form__button-wrapper">
                                    <div className="b-booking-form__button">
                                        <Button
                                            type="submit"
                                            modif="b-button--full"
                                        >{!showFileldPassword ? "Забронировать" : "Подтвердить"}</Button>
                                    </div>

                                    <div className="b-booking-form__button">
                                        <Button
                                            theme={{orange: true}}
                                            onClick={this.onCancel}
                                            modif="b-button--full"
                                        >Отмена</Button>
                                    </div>
                                </div>
                            </form>
                        )
                    }}
                />
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
