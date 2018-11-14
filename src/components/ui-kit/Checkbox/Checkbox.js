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

    constructor(props) {
        super(props);

        this.state = {
            isCheck: props.checked
        }
    }

    handleChange = () => {
        this.setState({
            isCheck: !this.state.isCheck
        })
    }

    render() {
        const { name, id, text, value, modif} = this.props;
        const { isCheck } = this.state;

        return(
            <div className={`b-checkbox ${modif ? modif : ''}`}>
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
