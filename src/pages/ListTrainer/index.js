import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { configPathRouter } from '../../App/configPathRouter';

class ListTrainer extends Component {
    render() {
        return (
            <div className="container">
                <h1>ListTrainer</h1>
                <Link to={configPathRouter.scheduleTrainer}>Елена Намунка</Link>
            </div>
        )
    }
}

export default ListTrainer;