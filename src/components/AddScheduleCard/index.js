import React, { Component } from 'react';

// Note: components
import Input from '../ui-kit/Input/Input';
import Checkbox from '../ui-kit/Checkbox/Checkbox';
import TimeField from '../TimeField';

// Note: style
import '../../style/bem-blocks/b-add-schedule-card/index.scss';

// Note: image
import deleteIcon from '../../style/images/icon/delete.svg';

class AddScheduleCard extends Component {

    render() {
        const { idRender, data, onChangeTime, onRemoveCard, playgroundsForTraining, onChangeInput, onChangeCheckbox } = this.props;
        console.log(playgroundsForTraining);

        return(
            <div className="b-add-schedule-card">
                <div onClick={onRemoveCard} className="b-add-schedule-card__delete">
                    <img className="b-add-schedule-card__delete-icon" src={deleteIcon} alt="Удалить" />
                </div>
                <div className="b-add-schedule-card__field b-add-schedule-card__field--left">
                    <TimeField
                        time={data.start_time}
                        name={'start_time'}
                        onChangeTime={onChangeTime}
                        label={"С"}
                    />
                </div>

                <div className="b-add-schedule-card__field b-add-schedule-card__field--right">
                    <TimeField
                        time={data.end_time}
                        name={'end_time'}
                        onChangeTime={onChangeTime}
                        label={"По"}
                    />
                </div>

                <div className="b-add-schedule-card__field">
                    <Input 
                        labelText={'Цена за час'}
                        idInput={`price-${idRender}`}
                        placeholder='Цена за час'
                        value={data.price_per_hour}
                        onChange={onChangeInput}
                        nameInput={'price_per_hour'}
                        theme={{blackColor: true}}
                    />
                </div>

                <div className="b-add-schedule-card__check">
                    <div className="b-add-schedule-card__title-section">Корт</div>

                    <ul className="b-add-schedule-card__check-list">
                        {playgroundsForTraining.length > 0 ? 
                            playgroundsForTraining.map((item, index) => {
                                
                                const isCheck = (num) => {
                                    return num === item.id
                                }
                                let checkIs = false;

                                if (data.playgroundsCheck.length > 0) {
                                    checkIs = data.playgroundsCheck.some(isCheck);
                                };

                                console.log(data.playgroundsCheck);

                                return (
                                    <li key={item.id} className="b-add-schedule-card__check-item">
                                        <Checkbox 
                                            name={`${item.id}`}
                                            id={`court-${item.id}${idRender}`}
                                            text={item.name}
                                            value={item.id}
                                            checked={checkIs}
                                            onChange={onChangeCheckbox}
                                        />
                                    </li>
                                )
                            })
                            : null
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddScheduleCard;
