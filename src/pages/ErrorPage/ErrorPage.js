import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorPage extends Component {
    render() {
        const { error } = this.props;

        return(
            <div>
                <div>Error</div>
                <div>{error}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        error: state.registration.error
    }
}

export default connect(mapStateToProps)(ErrorPage);
