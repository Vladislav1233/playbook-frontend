// react, redux
import React, { Component } from 'react';

// style
import '../../../style/bem-blocks/b-input/index.scss';

class Input extends Component {
    // TODO: Отключить или стилизовать автозаполнение в input
    render() {
        const { labelText, typeInput, idInput, placeholder, value, nameInput } = this.props;

        return(
            <div className='b-input'>
                {labelText ? 
                    <label htmlFor={idInput} className="b-input__label">{labelText}</label> 
                : null}
                
                <input 
                    className="b-input__input"
                    id={idInput}
                    name={nameInput ? nameInput : idInput}
                    type={typeInput ? typeInput : 'text'} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

export default Input;
