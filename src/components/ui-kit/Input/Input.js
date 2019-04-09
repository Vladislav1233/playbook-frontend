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
        const {
            labelText, typeInput, idInput, placeholder, value, nameInput, modif,
            theme, onChange, autoComplete, maxValue, minValue, disabled, error, invalidRanges,
            infoLabel
        } = this.props;

        const classInput = cn('b-input', modif, {
            'b-input--black-color': theme ? theme.blackColor : false,
            'error': error || invalidRanges
        });

        return(
            <div className={classInput}>
                {labelText ?
                    <label htmlFor={idInput} className="b-input__label">
                        {labelText}
                        {infoLabel ? <span className="b-input__label-info">{infoLabel}</span> : ''}
                    </label>
                : null}

                <input
                    className="b-input__input"
                    id={idInput}
                    name={nameInput ? nameInput : idInput}
                    type={typeInput}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete ? 'on' : 'off'}
                    max={maxValue}
                    min={minValue}
                    disabled={disabled ? disabled : null}
                />

                {error ? <div className="b-input__error">{error}</div> : null}
            </div>
        )
    }
}

export default Input;
