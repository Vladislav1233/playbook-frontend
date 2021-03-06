import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from "react-router-dom";

// style
import '../../../style/bem-blocks/b-button/index.scss';

class Button extends Component {

    render() {
        const { name, children, theme, onClick, modif, to } = this.props;
        const classButton = cn('b-button', modif, {
            'b-button--hollow': theme ? theme.orange : false
        });

        const TagName = to ? Link : 'button';

        return(
            <TagName 
                className={classButton} 
                onClick={onClick ? onClick : null}
                to={to}
                {...this.props}
            >
                {name ? name : children ? children : ''}
            </TagName>
        )
    }
}

export default Button;
