// react, redux
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// style
import '../../../style/bem-blocks/b-checkbox/index.scss';

class Checkbox extends Component {

    static defaultProps = {
        checked: false
    }

    static propTypes = {
        name: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        checked: PropTypes.bool,
        modif: PropTypes.string
    }

    render() {
        const { name, id, value, modif, checked, type, children, error } = this.props;

        const classNameCheckbox = cn(
            'b-checkbox',
            modif,
            {
                'b-checkbox--check': checked
            }
        );

        const classNameStyleCheck = cn(
            'b-checkbox__check',
            {
                'b-checkbox__check--check': checked
            }
        )

        return(
            <div className={classNameCheckbox}>
                <div className="b-checkbox__content">
                    <input
                        className="b-checkbox__input"
                        type={type ? type : 'checkbox'} 
                        name={name}
                        id={id}
                        value={value}
                        checked={checked}
                        onChange={(e) => {
                            this.props.onChange(e)
                        }}
                    />
                    <label className={classNameStyleCheck} htmlFor={id}>
                        <svg width="100%" height="100%" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                    {children  
                        ? <label className="b-checkbox__label" htmlFor={id}>
                            {children}
                        </label>
                        : null
                    }
                </div>
                
                {error  
                    ? <div className="b-checkbox__error">
                        {error}
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Checkbox;
