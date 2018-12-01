import React, { Component } from 'react';

// Note: components
import Input from '../ui-kit/Input/Input';
import Checkbox from '../ui-kit/Checkbox/Checkbox';

class AddScheduleCard extends Component {

    render() {
        const { idRender, data, isCheck } = this.props;
        // const { labelText, typeInput, idInput, placeholder, value, nameInput } = this.props;

        return(
            <div className="b-add-schedule-card">
                <div className="b-add-schedule-card__field">
                    <Input 
                        labelText={'С'}
                        idInput={`from-${idRender}`}
                        placeholder='С'
                        value={data.start_time}
                        onChange={this.props.onChangeInput}
                        nameInput={'start_time'}
                    />
                </div>

                <div className="b-add-schedule-card__field">
                    <Input 
                        labelText={'До'}
                        idInput={`to-${idRender}`}
                        placeholder='До'
                        value={data.end_time}
                        onChange={this.props.onChangeInput}
                        nameInput={'end_time'}
                    />
                </div>

                <div className="b-add-schedule-card__field">
                    <Input 
                        labelText={'Цена за час'}
                        idInput={`price-${idRender}`}
                        placeholder='Цена за час'
                        value={data.price_per_hour}
                        onChange={this.props.onChangeInput}
                        nameInput={'price_per_hour'}
                    />
                </div>

                <div className="b-add-schedule-card__check">
                    <div className="b-add-schedule-card__title-section">Корт</div>

                    <ul className="b-add-schedule-card__check-list">
                        <li className="b-add-schedule-card__check-item">
                            <Checkbox 
                                name="court"
                                id="court-0"
                                text="Lawn tennis"
                                value="court-0"
                                checked={isCheck}
                                onChange={() => {}}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddScheduleCard;
