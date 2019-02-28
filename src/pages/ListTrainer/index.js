import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerList, clearTrainerListStore } from '../../store/actions/trainerList';

// Note: components
import ObjectCard from '../../components/ObjectCard';
import Button from '../../components/ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-list-trainer/index.scss';

class ListTrainer extends Component {

    componentDidMount() {
        this.moreTrainer();
    }

    componentWillUnmount() {
        this.props.clearTrainerListStore();
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
        const { listTrainer, totalCount, pagination } = this.props;

        return (
            <div className="b-list-trainer">
                <div className="container container--white">
                    <h1>
                        Список тренеров
                        <span className="b-list-trainer__note">
                            Всего тренеров: {totalCount}
                        </span>
                    </h1>

                    <ul className="b-list-trainer__list">

                        {listTrainer.length > 0
                            ? listTrainer.map(item => {
                                return (
                                    <li key={item.id} className="b-list-trainer__item">
                                        <ObjectCard trainerInfo={item} />
                                    </li>
                                )       
                            })
                            : <p>Тренеров нет</p>
                        }
                    </ul>  

                    {totalCount > pagination.offset
                        ? <div className="b-list-trainer__more">
                            <Button 
                                theme={{orange:true}}
                                name="Показать ещё"
                                onClick={this.moreTrainer}
                            />
                        </div> 
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
        totalCount: trainerList.total_count
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainerList: (data) => dispatch(getTrainerList(data)),
        clearTrainerListStore: () => dispatch(clearTrainerListStore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTrainer);