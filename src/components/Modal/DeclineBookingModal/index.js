import React, { Component } from 'react';

// Note: components
import Button from '../../ui-kit/Button/Button';
import ModalComponent from '../index';
import Textarea from '../../ui-kit/Textarea';

class DeclineBookingModal extends Component {

	state = {
		notePlayer: ''
	};

	handleChangeInput = (event) => {
        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    };

  	render() {
		const { isOpenModal, closeModal, onClickDecline, nameButton } = this.props;
		const { notePlayer } = this.state;

    	return(
			<ModalComponent
				isOpenModal={isOpenModal}
				closeModal={closeModal}
				title='Отменить бронирование'
			>
				<Textarea
					labelText="Сообщение о причине отмены"
					idInput="notePlayer"
					nameInput="notePlayer"
					placeholder="Напишите причину отмены"
					value={notePlayer}
					onChange={e => this.handleChangeInput(e)}
					theme={{blackColor: true}}
				/>

				<div className="b-modal__button-wrapper">
					<Button 
						name={nameButton}
						onClick={() => {
							onClickDecline(notePlayer);
							closeModal();
						}}
					/>
				</div>
      		</ModalComponent>
    	)
  	}
}

export default DeclineBookingModal;