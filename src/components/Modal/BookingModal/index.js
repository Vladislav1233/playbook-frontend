import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    render() {
        const { isOpenModal, closeModal, playgroundsForTraining, isAuthorization } = this.props;

        const templateCost = (title, cost) => {
            return(
                <div className="b-cost-information">
                    <div className="b-cost-information__title">{title}</div>
                    <div className="b-cost-information__cost">{cost}</div>
                </div>
            )
        };

        return(
            <ModalComponent
                isOpenModal={isOpenModal}
                closeModal={closeModal}
                title='Букинг'
            >
                <form className="b-booking-form">
                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Время</legend>
                        <Input 
                            labelText='С'
                            typeInput='time'
                            idInput='startBooking'
                            value={this.state.start_time}
                            nameInput='start_time'
                            theme={{blackColor: true}}
                            onChange={this.onChangeInput}
                            modif='b-input--time-booking'
                        />

                        <Input 
                            labelText='По'
                            typeInput='time'
                            idInput='endBooking'
                            value={this.state.end_time}
                            nameInput='end_time'
                            theme={{blackColor: true}}
                            onChange={this.onChangeInput}
                            modif='b-input--time-booking'
                        />
                    </fieldset>
                    
                    {/* TODO: радиобаттоны для корта */}
                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Корт</legend>
                        {playgroundsForTraining ? playgroundsForTraining.map( item => {
                            return (
                                <Checkbox 
                                    key={`playground_${item.id}`}
                                    type='radio'
                                    name="playground"
                                    id={`playground_${item.id}`}
                                    text={item.name}
                                    value={item.id}
                                    checked={this.state.playgroundId === item.id}
                                    onChange={this.onChangeRadio}
                                    modif={'b-checkbox--add-schedule'}
                                />
                            )
                        }): null}
                    </fieldset>

                    <fieldset className="b-booking-form__fieldset">
                        <legend className="b-modal__title-group">Стоимость</legend>
                        {templateCost('Оплата услуг тренера', '1500 р.')}
                        {templateCost('Оплата услуг корта', '3000 р.')}
                        {templateCost('Итого к оплате', '4500 р.')}
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
