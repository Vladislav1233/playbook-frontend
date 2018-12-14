import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { configPathRouter } from '../../App/configPathRouter';

class ListCourt extends Component {
    render() {
        return (
            <div className="container">
                <h1>ListCourt</h1>
                <Link to={configPathRouter.scheduleCourt}>Lawn tennis</Link>
            </div>
        )
    }
}

export default ListCourt;