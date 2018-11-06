// react, redux
import React, { Component } from 'react';

class Input extends Component {

    render() {
        const { labelText, typeInput, idInput, placeholder } = this.props;

        return(
            <div className='b-input'>
                {labelText ? 
                    <label for={idInput} className="b-input__label">{labelText}</label> 
                : null}
                
                <input id={idInput} type={typeInput} placeholder={placeholder} />
            </div>
        )
    }
}

export default Input;
