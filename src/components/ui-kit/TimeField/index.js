/*
* Idea from https://github.com/peterjoseph/react-time-range/blob/master/src/index.js
*/

import React, { Component } from 'react';

// Note: components
import Input from '../Input/Input';

class TimeField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue,
            error: false,
            errorText: ''
        };
    };

    onChange = (e) => {

        const { value } = e.target;
        const { minIncrementProp } = this.props;

        // Todo: пока не знаю как делать шаг в один час.
        // let hour = value.substring(0, 2);
        let minutes = value.substring(3, 5);
        let errorObject = {
            error: false,
            errorText: ''
        };

        if (minIncrementProp < 60) {
            if (+minutes % minIncrementProp !== 0) {
                errorObject.error = true;
                errorObject.errorText = `Доступны значения времени c шагом в ${minIncrementProp} минут(у)`;

                this.setState({
                    error: errorObject.error,
                    errorText: errorObject.errorText
                });
            } else {
                errorObject.error = false;
                errorObject.errorText = '';

                this.setState({
                    error: errorObject.error,
                    errorText: errorObject.errorText
                });
            }
        };

        this.setState({
            value: value
        });

        // eslint-disable-next-line
        this.props.onChangeTimeField ? this.props.onChangeTimeField(e, value, errorObject) : null;
    };

    render() {
        const { value } = this.state;

        return(
            <Input
                {...this.props}
            />
        )
    }
};

export default TimeField;

TimeField.defaultProps = {
    initialValue: '',
    minIncrementProp: 5
};