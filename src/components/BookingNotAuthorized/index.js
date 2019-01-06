import React, { Component } from 'react';
import Modal from 'react-modal';
import { configPathRouter } from '../../App/configPathRouter';

// Note: components
import Buttom from '../ui-kit/Button/Button';

Modal.setAppElement('#root');

class BookingNotAuthorized extends Component {
    render() {
        const { isOpenModal, closeModal } = this.props;

        return (
            <Modal
                isOpen={isOpenModal}
            >
                <button className="b-modal__close" onClick={closeModal}>Закрыть</button>
                <h2 className="b-modal__title">Букинг</h2>
                <div className="b-modal__description">
                    Чтобы забронировать время вам нужно авторизоваться. Нет профиля? Пройдите быструю регистрацию.
                </div>

                <div className="b-modal__content">
                    <Buttom 
                        to={configPathRouter.authorization}
                        name="Авторизация"
                    />

                    <Buttom 
                        to={configPathRouter.registration}
                        name="Регистрация"
                    />
                </div>
            </Modal>
        )
    }
};

export default BookingNotAuthorized;