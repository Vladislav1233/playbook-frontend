import React, { Component } from 'react';
import Modal from 'react-modal';

// Note: components
import Input from '../ui-kit/Input/Input';
import InputMask from 'react-input-mask';
import Button from '../ui-kit/Button/Button';

// Note: services
import { bookingService } from '../../services/booking';
import { userService } from '../../services/userService';

// Note: helpers
import telWithoutPlus from '../../helpers/telWithoutPlus';

// Note: styles
import '../../style/bem-blocks/b-close/index.scss';
import '../../style/bem-blocks/b-modal/index.scss';
import '../../style/bem-blocks/b-booking-form/index.scss';
import '../../style/bem-blocks/b-cost-information/index.scss';

Modal.setAppElement('#root');

class BookingModal extends Component {

    state = {
        start_time: '',
        end_time: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: ''
    }

    onChangeInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    };

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
            password: ''
        });
    }

    onSubmitBooking = (e) => {
        e.preventDefault();
        const { typeBooking, dateBooking } = this.props;
        const { start_time, end_time } = this.state;
        const valueToken = localStorage.getItem('userToken');

        const data = {
            start_time: `${dateBooking} ${start_time}:00`,
            end_time: `${dateBooking} ${end_time}:00`,
            bookable_id: 1
        };

        const bookingStart = () => {
            bookingService.createBooking(typeBooking, data)
                .then(
                    res => {
                        console.log(res);       
                }, 
                    err => {
                        console.log(err);
                });
        };

        if(valueToken) {
            bookingStart();
        } else {
            const dataLogin = {
                phone: telWithoutPlus(this.state.phone),
                password: this.state.password
            };
    
            userService.login(dataLogin)
                .then(() => {
                    bookingStart();
                },
                err => {
                    console.log(err);
                });
        };
    };

    render() {
        const { isOpenModal, closeModal } = this.props;
        const valueToken = localStorage.getItem('userToken');

        const templateCost = (title, cost) => {
            return(
                <div className="b-cost-information">
                    <div className="b-cost-information__title">{title}</div>
                    <div className="b-cost-information__cost">{cost}</div>
                </div>
            )
        };

        return(
            <Modal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
            >
                <div className="b-modal">
                    <button className="b-close b-close--modal" onClick={closeModal}></button>
                    <div className="b-modal__content">
                        <h2 className="b-modal__title">Букинг</h2>

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
                                    minValue='13:00'
                                    maxValue='17:00'
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
                                    minValue='13:00'
                                    maxValue='17:00'
                                    modif='b-input--time-booking'
                                />
                            </fieldset>
                            
                            {/* TODO: радиобаттоны для корта */}
                            {/* <fieldset className="b-booking-form__fieldset">

                            </fieldset> */}

                            <fieldset className="b-booking-form__fieldset">
                                <legend className="b-modal__title-group">Стоимость</legend>
                                {templateCost('Оплата услуг тренера', '1500 р.')}
                                {templateCost('Оплата услуг корта', '3000 р.')}
                                {templateCost('Итого к оплате', '4500 р.')}
                            </fieldset>

                            {!valueToken ?
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
                    </div>
                </div>
            </Modal>
        )
    }
}

export default BookingModal;