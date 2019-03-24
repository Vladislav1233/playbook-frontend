import React, { Component } from 'react';
import cn from 'classnames';

// Note: styles
import '../../../style/bem-blocks/b-radio/index.scss';

class Radio extends Component {
    render() {
        const { name, id, text, value, modif, checked } = this.props;

        const classNameRadio = cn(
            'b-radio',
            modif,
        );

        const classNameStyleLabel = cn(
            'b-radio__label',
            {
                'b-radio__label--checked': checked
            }
        );

        return(
            <div className={classNameRadio}>
                <input
                    className="b-radio__input"
                    type='radio' 
                    name={name}
                    id={id}
                    value={value}
                    checked={checked}
                    onChange={(e) => {
                        this.props.onChange(e)
                    }}
                />
                <label className={classNameStyleLabel} htmlFor={id}>
                    <i className="b-radio__icon"></i>
                    <span className="b-radio__text">{text}</span>
                </label>
            </div>
        )
    }
}

export default Radio;