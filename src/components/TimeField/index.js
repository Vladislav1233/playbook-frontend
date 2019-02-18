import React, { Component } from 'react';
// import TimePicker from '../../helpers/timePicker/lib';
import TimePicker from 'react-times';
import cn from 'classnames';
import { connect } from "react-redux";
import { toggleScrollPage } from '../../store/actions/toggleScrollPage';

// Note: style
import '../../style/bem-blocks/b-time-field/index.scss';
// use material theme for TimePicker
import 'react-times/css/material/default.css';

class TimeField extends Component {
    state = {
        focused: false
    };

    onTimeChange = (options, name) => {

        const {
            hour,
            minute
          } = options;

        this.props.onChangeTime(`${hour}:${minute}`, name);
    };

    onFocusChange = (focused) => {
        this.setState({
            focused
        });

        this.props.toggleScrollPage(focused);
    };

    render() {
        const { time, name, label } = this.props;
        const { focused } = this.state;

        const keeperWrapperClass = cn('b-time-field__keeper-wrapper');
        const styleCover = cn('b-cover-page', {
            'active': focused
        });

        return (
            <div className="b-time-field">
                <div className={keeperWrapperClass}>
                    { label ? <div className="b-time-field__label">{label}</div> : null }

                    <TimePicker 
                        withoutIcon
                        theme="material"
                        colorPalette="dark"

                        onTimeChange={(options) => this.onTimeChange(options, name)}
                        time={time ? time : '00:00'}
                        focused={focused}
                        onFocusChange={this.onFocusChange}
                    />
                </div>

                <div className={styleCover}></div>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        toggleScrollPage: (isNoScroll) => dispatch(toggleScrollPage(isNoScroll))
    }
}

export default connect(null, mapStateToDispatch)(TimeField);
