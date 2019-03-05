import React, { Component } from 'react';

// Note: components
import Button from '../Button/Button';

// Note: styles
import '../../../style/bem-blocks/b-alert/index.scss';

class Alert extends Component {

    closeAlert = (e) => {
        e.preventDefault();

        this.props.closeAlert();
    }

    render() {
        const { children, buttonOk } = this.props;

        // TODO_HOT: выводить общий класс для error sucsess в корень
        // TODO_HOT: попробывать засунуть в общий фулскрин затемняшку
        return(
            <div className="b-alert">
                <div className="b-alert__content">
                    {children}
                </div>

                {buttonOk ?
                    <div className="b-alert__button-wrapper">
                        <Button 
                            name="Ok"
                            onClick={this.closeAlert}
                        />
                    </div>  
                : null}
            </div>
        )
    }
};

export default Alert;