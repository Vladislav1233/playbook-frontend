import React, { Component } from 'react';

// style
import '../../../style/bem-blocks/b-button/index.scss';

class Button extends Component {

    render() {
        const { name } = this.props;

        return(
            <button className="b-button">{name}</button>
        )
    }
}

export default Button;
