import React, { Component } from 'react';

// Note: components
// import Button from '../../ui-kit/Button/Button';
import ModalComponent from '../index';

class DeclineBookingModal extends Component {

  	render() {
    	const { isOpenModal, closeModal } = this.props;

    	return(
			<ModalComponent
				isOpenModal={isOpenModal}
				closeModal={closeModal}
				title='Отменить запрос на бронирование'
			>

      		</ModalComponent>
    	)
  	}
}

export default DeclineBookingModal;