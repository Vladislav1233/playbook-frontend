import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'react-final-form';

// Note: helpers
import { required, startTimeBeforeEndTime, composeValidators, validFormatTime } from '../../helpers/validate';

// Note: components
import Input from '../ui-kit/Input/Input';
import Checkbox from '../ui-kit/Checkbox/Checkbox';
import TimeField from '../ui-kit/TimeField';

// Note: style
import '../../style/bem-blocks/b-add-schedule-card/index.scss';

// Note: image
import deleteIcon from '../../style/images/icon/delete.svg';

class AddScheduleCard extends Component {

    render() {
        const { 
            idRender, 
            data, 
            onChangeTime, 
            onRemoveCard, 
            playgroundsForTraining, 
            onChangeInput, 
            onChangeCheckbox,
            canDelete,

            remove,
            name
        } = this.props;

        return(
            <div className="b-add-schedule-card">
                <div onClick={remove} className="b-add-schedule-card__delete" title="Удалить">
                    <img className="b-add-schedule-card__delete-icon" src={deleteIcon} alt="Корзина" />
                </div>
                <div className="b-add-schedule-card__field b-add-schedule-card__field--left">

                    <Field 
                        name={`${name}.start_time`}
                        validate={value => {
                            return composeValidators(
                                required(),
                                validFormatTime('Поле времени начала бронирования указано не полностью')
                            )(value)
                        }}
                        render={({ input }) => {
                            return <TimeField 
                                {...input}
                                labelText='С'
                                // idInput='startBooking'
                                nameInput={input.name}
                                theme={{blackColor: true}}
                                modif='b-input--time-booking'
                            />
                        }}
                    />
                    {/* <TimeField
                        time={data.start_time}
                        name={'start_time'}
                        onChangeTime={onChangeTime}
                        label={"С"}
                    /> */}
                </div>

                {/* <div className="b-add-schedule-card__field b-add-schedule-card__field--right">
                    <TimeField
                        time={data.end_time}
                        name={'end_time'}
                        onChangeTime={onChangeTime}
                        label={"До"}
                    />
                </div> */}

                {/* <div className="b-add-schedule-card__field">
                    <Input 
                        labelText={'Цена за час, ₽'}
                        idInput={`price-${idRender}`}
                        placeholder='Цена за час'
                        value={data.price_per_hour}
                        onChange={onChangeInput}
                        nameInput={'price_per_hour'}
                        theme={{blackColor: true}}
                        typeInput="number"
                    />
                </div> */}

                {/* <div className="b-add-schedule-card__check">
                    <div className="b-add-schedule-card__title-section">Корт</div>

                    <ul className="b-add-schedule-card__check-list">
                        {playgroundsForTraining.length > 0 ? 
                            playgroundsForTraining.map(item => {
                                
                                const isCheck = (num) => {
                                    return num === item.uuid
                                }
                                let checkIs = false;

                                if (data.playgroundsCheck.length > 0) {
                                    checkIs = data.playgroundsCheck.some(isCheck);
                                }

                                return (
                                    <li key={item.uuid} className="b-add-schedule-card__check-item">
                                        <Checkbox 
                                            name={`${item.uuid}`}
                                            id={`court-${item.uuid}${idRender}`}
                                            value={item.uuid}
                                            checked={checkIs}
                                            onChange={onChangeCheckbox}
                                            modif='b-checkbox--add-schedule'
                                        >
                                            <span>{item.name}</span>
                                        </Checkbox>
                                    </li>
                                )
                            })
                            : <li className="b-add-schedule-card__check-item">
                                <p>Добавьте информацию о кортах, на которых работаете в разделе <Link className="b-add-schedule-card__link" to="/profile/trainer-info">"Обо мне"</Link>.</p>
                            </li>
                        }
                    </ul>
                </div> */}

                {/* { data.errorCardText ?
                    <div className="b-add-schedule-card__error">{data.errorCardText}</div>
                    : null
                } */}
            </div>
        )
    }
}

export default AddScheduleCard;
