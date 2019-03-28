/*
* Idea from https://github.com/peterjoseph/react-time-range/blob/master/src/timeModel.js
*/

import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import cn from 'classnames';

// style
import '../../../style/bem-blocks/b-input/index.scss';

class TimeField extends Component {

    render() {
        const { 
            labelText, 
            idInput, 
            modif,
            theme, 
            error,
            value,
            onChange,
            name,
            onBlur,
            onFocus,
            invalidRanges
        } = this.props;

        const classInput = cn('b-input', modif, {
            'b-input--black-color': theme ? theme.blackColor : false,
            'error': error || invalidRanges
        });

        return(
            <div className={classInput}>
                {labelText ? 
                    <label htmlFor={idInput} className="b-input__label">{labelText}</label> 
                : null}
                
                <InputMask 
                    className="b-input__input"
                    name={name}
                    mask={'99:99'}
                    maskChar={null}
                    placeholder='--:--'
                    value={value}
                    id={idInput}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    type="tel"
                />

                {error ? <div className="b-input__error">{error}</div> : null}
            </div>
        )
    }
}

export default TimeField;