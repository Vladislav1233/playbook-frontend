import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from "react-router-dom";

// style
import '../../../style/bem-blocks/b-button/index.scss';

class Button extends Component {

    render() {
        const { name, theme, onClick, modif, to } = this.props;
        const classButton = cn('b-button', modif, {
            'b-button--orange': theme ? theme.orange : false
        });

        const TagName = to ? Link : 'button';

        return(
            <TagName 
                className={classButton} 
                onClick={onClick ? onClick : null}
                to={to}
            >
                {name}
            </TagName>
        )
    }
}

export default Button;
