import React, { Component } from 'react';

// Note: components
import Input from '../ui-kit/Input/Input';
import Checkbox from '../ui-kit/Checkbox/Checkbox';
import TimePicker from 'react-timekeeper';

class AddScheduleCard extends Component {

    render() {
        const { idRender, data, isCheck, onChangeTime } = this.props;
        // const { labelText, typeInput, idInput, placeholder, value, nameInput } = this.props;

        return(
            <div className="b-add-schedule-card">
                <div className="b-add-schedule-card__field">
                    <TimePicker 
                        time={data.start_time}
                        onChange={(value) => onChangeTime(value, 'start_time')}
                    />
                    <div className="b-add-schedule-card__time">
                        {data.start_time ? data.start_time : '__ : __'}
                    </div>
                </div>

                <div className="b-add-schedule-card__field">
                    <TimePicker
                        time={data.end_time}
                        onChange={(value) => onChangeTime(value, 'end_time')}
                    />
                    <div className="b-add-schedule-card__time">
                        {data.end_time ? data.end_time : '__ : __'}
                    </div>
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
