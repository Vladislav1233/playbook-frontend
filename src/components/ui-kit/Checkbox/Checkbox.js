// react, redux
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        checked: PropTypes.bool
    }

    state = {
        isCheck: false
    }

    handleChange = () => {
        this.setState({
            isCheck: !this.state.isCheck
        })
    }

    render() {
        const { name, id, text, value} = this.props;
        const { isCheck } = this.state;

        return(
            <div className="b-checkbox">
                <input
                    className="b-checkbox__input"
                    type='checkbox' 
                    name={name}
                    id={id}
                    value={value}
                    checked={isCheck}
                    onChange={this.handleChange}
                />
                <label 
                    className="b-checkbox__label"
                    htmlFor={id}
                >
                    {text ? <span>{text}</span> : null}
                </label>
            </div>
        )
    }
}

export default Checkbox;
