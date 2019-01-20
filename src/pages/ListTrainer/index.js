import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerList } from '../../store/actions/trainerList';

// Note: components
import ObjectCard from '../../components/ObjectCard';

// Note: styles
import '../../style/bem-blocks/b-list-trainer/index.scss';

class ListTrainer extends Component {

    componentDidMount() {
        const data = {
            limit: 4,
            offset: 0
        };

        this.props.getTrainerList(data);
    }

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


const mapStateToProps = ({ toggleCabinet }) => {
    return {
        toggleCabinet: toggleCabinet.toggleCabinet
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainerList: (data) => dispatch(getTrainerList(data))
    }
}

export default connect(null, mapDispatchToProps)(ListTrainer);