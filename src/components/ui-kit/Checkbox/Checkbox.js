// react, redux
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         isCheck: props.checked
    //     }
    // }

    // handleChange = () => {
    //     this.setState({
    //         isCheck: !this.state.isCheck
    //     })
    // }

    render() {
        const { name, id, text, value, modif, checked, type } = this.props;

        return(
            <div className={`b-checkbox ${modif ? modif : ''}`}>
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
                <label className={`b-checkbox__check ${checked ? 'b-checkbox__check--check' : ''}`} htmlFor={id}>
                    <svg width="100%" height="100%" viewBox="0 0 18 18">
                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
                {text ? 
                    ( 
                    <label className="b-checkbox__label" htmlFor={id}>
                        <span>{text}</span>
                    </label>
                    ) : null}
            </div>
        )
    }
}

export default Checkbox;
