import React, { Component } from 'react';

// style
import '../../style/bem-blocks/b-not-found/index.scss';

class NotFound extends Component {
    render() {
        return (
            <div className="b-not-found">
                404! Страница не найдена.
            </div>
        )
    }
}

export default NotFound; 