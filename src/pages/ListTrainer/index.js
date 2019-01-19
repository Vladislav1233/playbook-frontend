import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { configPathRouter } from '../../App/configPathRouter';

// Note: components
import ObjectCard from '../../components/ObjectCard';

// Note: styles
import '../../style/bem-blocks/b-list-trainer/index.scss';

class ListTrainer extends Component {
    render() {
        return (
            <div className="container">
                <div className="b-list-trainer">
                    <h1>Список тренеров</h1>

                    <ul className="b-list-trainer__list">
                        <li className="b-list-trainer__item">
                            <ObjectCard />
                        </li>
                    </ul>

                    <Link to={configPathRouter.scheduleTrainer}>Елена Намунка</Link>                    
                </div>
            </div>
        )
    }
}

export default ListTrainer;