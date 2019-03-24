import React, { Component } from 'react';
import cn from 'classnames';

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
        const { 
            children, 
            buttonOk, 
            type
        } = this.props;

        const classNameAlert = cn('b-alert', {
            'b-alert--success': type === 'alert-success',
            'b-alert--error': type === 'alert-error'
        });

        // TODO_HOT: попробывать засунуть в общий фулскрин затемняшку
        return(
            <aside className={classNameAlert}>
                <h1 className="b-alert__heading">
                    { type === 'alert-success'
                        ? 'Успех'
                        : 'Ошибка'
                    }
                </h1>

                <div className="b-alert__content">
                    {children}
                </div>

                {buttonOk ?
                    <div className="b-alert__button-wrapper">
                        <Button 
                            name={ type === 'alert-success' ? 'Отлично' : 'Понятно' }
                            modif="b-button--alert-prima"
                            onClick={this.closeAlert}
                        />
                    </div>  
                : null}
            </aside>
        )
    }
}

export default Alert;