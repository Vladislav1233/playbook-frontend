import React, { Component } from 'react';

// Note: components
import ObjectCard from '../../components/ObjectCard';

// Note: styles
import '../../style/bem-blocks/b-list-trainer/index.scss';

class ListTrainer extends Component {
    render() {
        return (
            <div className="container container--white">
                <div className="b-list-trainer">
                    <h1>Список тренеров</h1>

                    <ul className="b-list-trainer__list">
                        <li className="b-list-trainer__item">
                            <ObjectCard />
                        </li>

                        <li className="b-list-trainer__item">
                            <ObjectCard />
                        </li>

                        <li className="b-list-trainer__item">
                            <ObjectCard />
                        </li>
                    </ul>                   
                </div>
            </div>
        )
    }
}

export default ListTrainer;