// react, redux
import React, { Component } from 'react';

class Input extends Component {

    render() {
        const { labelText, typeInput, idInput, placeholder, value } = this.props;

        return(
            <div className='b-input'>
                {labelText ? 
                    <label htmlFor={idInput} className="b-input__label">{labelText}</label> 
                : null}
                
                <input 
                    id={idInput}
                    name={idInput}
                    type={typeInput} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

export default Input;
