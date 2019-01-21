import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerList } from '../../store/actions/trainerList';

// Note: components
import ObjectCard from '../../components/ObjectCard';
import Button from '../../components/ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-list-trainer/index.scss';

class ListTrainer extends Component {

    componentDidMount() {
        this.moreTrainer();
    }

    moreTrainer = () => {
        const { pagination } = this.props;
        const data = {
            limit: pagination.limit,
            offset: pagination.offset
        };

        this.props.getTrainerList(data);
    }

    render() {
        const { listTrainer, hideMoreButton } = this.props;
        console.log(listTrainer);

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

                    {!hideMoreButton 
                        ? <Button 
                            name="Показать ещё"
                            onClick={this.moreTrainer}
                        />
                        : null
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ trainerList }) => {
    return {
        listTrainer: trainerList.listTrainer,
        pagination: trainerList.pagination,
        hideMoreButton: trainerList.hideMoreButton
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainerList: (data) => dispatch(getTrainerList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTrainer);