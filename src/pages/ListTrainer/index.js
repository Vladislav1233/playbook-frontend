import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerList, clearTrainerListStore } from '../../store/actions/trainerList';

// Note: components
import ObjectCard from '../../components/ObjectCard';
import Button from '../../components/ui-kit/Button/Button';
import Preloader from '../../components/Preloader/Preloader';

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
        const { 
            listTrainer, 
            totalCount, 
            pagination,
            preloader
        } = this.props;

        return (
            <div className="b-list-trainer">
                <div className="container">
                    <h1 className="b-list-trainer__heading">
                        Список тренеров
                        <span className="b-list-trainer__note">
                            Всего тренеров: {totalCount}
                        </span>
                    </h1>

                    <ul className="b-list-trainer__list">

                        {listTrainer.length > 0
                            ? listTrainer.map(item => {
                                return (
                                    <li key={item.uuid} className="b-list-trainer__item">
                                        <ObjectCard trainerInfo={item} />
                                    </li>
                                )       
                            })
                            : (
                                <li key='only-one-key' className="b-list-trainer__item">
                                    <div className="b-object-card__info">
                                        Тренеров нет
                                    </div>
                                </li>
                            )
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

                {preloader
                    ? <Preloader />
                    : null
                }
            </div>
        )
    }
}


const mapStateToProps = ({ trainerList }) => {
    return {
        listTrainer: trainerList.listTrainer,
        pagination: trainerList.pagination,
        totalCount: trainerList.total_count,
        preloader: trainerList.preloader
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrainerList: (data) => dispatch(getTrainerList(data)),
        clearTrainerListStore: () => dispatch(clearTrainerListStore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTrainer);