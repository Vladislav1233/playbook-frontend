import React, { Component } from 'react';
import cn from 'classnames';

// style
import '../../../style/bem-blocks/b-button/index.scss';

class Button extends Component {

    render() {
        const { name, theme, onClick } = this.props;
        const classButton = cn('b-button', {
            'b-button--orange': theme ? theme.orange : false
        })

        return(
            <button 
                className={classButton} 
                onClick={onClick ? onClick : null}
            >
                {name}
            </button>
        )
    }
}

export default Button;
