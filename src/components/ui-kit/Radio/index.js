import React, { Component } from 'react';
import cn from 'classnames';

// Note: styles
import '../../../style/bem-blocks/b-radio/index.scss';

class Radio extends Component {
    render() {
        const { name, id, text, value, modif, checked } = this.props;

        const classNameRadio = cn(
            'b-radio',
            modif
        );

        const classNameStyleCheck = cn(
            'b-radio__check',
            {
                'b-radio__check--checked': checked
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
                <label className={classNameStyleCheck} htmlFor={id}></label>
                {text ? 
                    ( 
                    <label className="b-radio__label" htmlFor={id}>
                        <span>{text}</span>
                    </label>
                    ) : null}
            </div>
        )
    }
};

export default Radio;