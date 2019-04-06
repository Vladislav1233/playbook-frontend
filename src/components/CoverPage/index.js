// react, redux
import React from 'react';
import cn from 'classnames';

// style
import '../../style/bem-blocks/b-cover-page/index.scss';

function CoverPage(props) {
    const className = cn(
        'b-cover-page',
        props.className,
        {
            active: props.active
        }
    )
    return (
        <div 
            className={className}
            onClick={props.onClick}
        >
        </div>
    )
}

export default CoverPage;
