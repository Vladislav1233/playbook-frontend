import React, { Component } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

// Note: styles
import '../../style/bem-blocks/b-close/index.scss';
import '../../style/bem-blocks/b-modal/index.scss';

Modal.setAppElement('#root');

class ModalComponent extends Component {

  render() {
    const { children, className, title, isOpenModal, closeModal } = this.props;
    const classNameModal = cn('b-modal', className); 

    return(
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
      >
        <div className={classNameModal}>
          <button className="b-close b-close--modal" onClick={closeModal}></button>

          <div className="b-modal__wrapper">
            {title && <h2 className="b-modal__title">{title}</h2>}
            <div className="b-modal__content">
              {children}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalComponent;