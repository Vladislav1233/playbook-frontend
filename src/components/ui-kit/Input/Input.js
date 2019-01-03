// react, redux
import React, { Component } from 'react';
import cn from 'classnames';

// style
import '../../../style/bem-blocks/b-input/index.scss';

class Input extends Component {
    static defaultProps = {
        typeInput: 'text',
        autoComplete: 'off',
        maxValue: '',
        minValue: ''
    }
    // TODO: Отключить или стилизовать автозаполнение в input
    render() {
        const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme, onChange, autoComplete, maxValue, minValue } = this.props;

        const classInput = cn('b-input', modif, {
            'b-input--black-color': theme ? theme.blackColor : false
        });

        return(
            <div className={classInput}>
                {labelText ? 
                    <label htmlFor={idInput} className="b-input__label">{labelText}</label> 
                : null}
                
                <input 
                    className="b-input__input"
                    id={idInput}
                    name={nameInput ? nameInput : idInput}
                    type={typeInput}
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    max={maxValue}
                    min={minValue}
                />
            </div>
        )
    }
}

export default Input;
