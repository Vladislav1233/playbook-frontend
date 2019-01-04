import React, { Component } from 'react';
import Modal from 'react-modal';

// Note: components
import Input from '../ui-kit/Input/Input';
// import InputMask from 'react-input-mask';
import Button from '../ui-kit/Button/Button';

// Note: services
import { bookingService } from '../../services/booking';

Modal.setAppElement('#root');

class BookingModal extends Component {

    state = {
        start_time: '',
        end_time: ''
        // first_name: '',
        // last_name: '',
        // phone: ''
    }

    onChangeInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    };

    onSubmitBooking = (e) => {
        e.preventDefault();
        const { typeBooking, dateBooking } = this.props;
        const { start_time, end_time } = this.state;

        const data = {
            start_time: `${dateBooking} ${start_time}:00`,
            end_time: `${dateBooking} ${end_time}:00`,
            bookable_id: 1
        };


        bookingService.createBooking(typeBooking, data)
            .then(
                res => {
                    console.log(res);       
            }, 
                err => {
                    console.log(err);
            });
    };

    render() {
        const { isOpenModal, closeModal } = this.props;

        const templateCost = (title, cost) => {
            return(
                <div className="b-cost-game">
                    <div className="b-cost-game__title">{title}</div>
                    <div className="b-cost-game__cost">{cost}</div>
                </div>
            )
        };

        return(
            <Modal
                isOpen={isOpenModal}
            >
                <button className="b-modal__close" onClick={closeModal}>Закрыть</button>
                <h2 className="b-modal__title">Букинг</h2>

                <form className="b-booking-form">
                    <fieldset className="b-booking-form__fieldset">
                        <legend>Время</legend>
                        {/* const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme, onChange, autoComplete } = this.props; */}
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
                            modif='b-input--inline'
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
                            modif='b-input--inline'
                        />
                    </fieldset>
                    
                    {/* TODO: радиобаттоны для корта */}
                    {/* <fieldset className="b-booking-form__fieldset">

                    </fieldset> */}

                    <fieldset className="b-booking-form__fieldset">
                        <legend>Стоимость</legend>
                        {templateCost('Оплата услуг тренера', '1500 рублей')}
                        {templateCost('Оплата услуг корта', '3000 рублей')}
                        {templateCost('Итого к оплате', '4500 рублей')}
                    </fieldset>

                    {/* <fieldset className="b-booking-form__fieldset">
                        <legend>Данные о вас</legend>

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
                            <InputMask 
                                className="b-input__input" 
                                id="phone" 
                                name="phone" 
                                mask="+7 (999) 999-99-99" 
                                maskChar={null} 
                                value={this.state.phone} 
                                onChange={this.onChangeInput} 
                                placeholder="Ваш номер телефона" />
                        </div>
                    </fieldset> */}

                    <div className="b-booking-form__button-wrapper">
                        <div className="b-booking-form__button">
                            <Button
                                name="Забронировать"
                                theme={{orange: true}}
                                onClick={e => this.onSubmitBooking(e)}
                            />
                        </div>

                        <div className="b-booking-form__button">
                            <Button
                                name="Отмена"
                                theme={{orange: true}}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default BookingModal;
