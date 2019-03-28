import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'react-final-form';

// Note: helpers
import { required } from '../../helpers/validate';

// Note: components
import Input from '../ui-kit/Input/Input';
import Checkbox from '../ui-kit/Checkbox/Checkbox';

// Note: style
import '../../style/bem-blocks/b-add-schedule-card/index.scss';

// Note: image
import deleteIcon from '../../style/images/icon/delete.svg';

class AddScheduleCard extends Component {

    render() {
        const {
            idRender,
            playgroundsForTraining,
            remove,
            name,
            metaForm
        } = this.props;

        return(
            <div className="b-add-schedule-card">
                <div onClick={remove} className="b-add-schedule-card__delete" title="Удалить">
                    <img className="b-add-schedule-card__delete-icon" src={deleteIcon} alt="Корзина" />
                </div>
                <div className="b-add-schedule-card__field b-add-schedule-card__field--left">

                    <Field
                        name={`${name}.start_time`}
                        validate={required()}
                        render={({ input, meta }) => {
                            return <Input
                                { ...input }
                                labelText='С'
                                typeInput="time"
                                idInput={`startBooking${idRender}`}
                                nameInput={input.name}
                                theme={{ blackColor: true }}
                                error={meta.error && (metaForm ? !metaForm.invalidRanges : true) && meta.touched && meta.error}
                                invalidRanges={metaForm ? metaForm.invalidRanges : false}
                            />
                        }}
                    />
                </div>

                <div className="b-add-schedule-card__field b-add-schedule-card__field--right">
                    <Field
                        name={`${name}.end_time`}
                        validate={required()}
                        render={({ input, meta }) => {
                            return <Input
                                { ...input }
                                nameInput={input.name}
                                labelText='До'
                                idInput={`endBooking${idRender}`}
                                theme={{ blackColor: true }}
                                typeInput='time'
                                error={meta.error && (metaForm ? !metaForm.invalidRanges : true) && meta.touched && meta.error}
                                invalidRanges={metaForm ? metaForm.invalidRanges : false}
                            />
                        }}
                    />
                </div>

                { metaForm ? metaForm.invalidRanges ?
                    <div className="b-add-schedule-card__error">{metaForm.start_time}</div>
                    : null
                    : null
                }

                <Field
                    name={`${name}.price_per_hour`}
                    type='number'
                    validate={required()}
                    render={({ input, meta }) => {
                        return <div className="b-add-schedule-card__field">
                            <Input
                                { ...input }
                                labelText='Цена за час, ₽'
                                idInput={`price-${idRender}`}
                                placeholder='Цена за час'
                                nameInput={input.name}
                                theme={{ blackColor: true }}
                                typeInput="number"
                                error={meta.error && meta.touched && meta.error}
                            />
                        </div>
                    }}
                />

                {playgroundsForTraining
                 ? <div className="b-add-schedule-card__check">
                    <div className="b-add-schedule-card__title-section">Корт</div>

                    <ul className="b-add-schedule-card__check-list">

                        {playgroundsForTraining.length > 0
                            ? playgroundsForTraining.map(item => {
                                return <li key={item.uuid} className="b-add-schedule-card__check-item">
                                    <Field
                                        name={`${name}.playgrounds`}
                                        type="checkbox"
                                        value={item.uuid}
                                        validate={value => value ? value.length === 0 ? 'Выберите как минимум один корт' : undefined : 'Выберите как минимум один корт'}
                                        render={({ input, meta }) => {
                                            return <Checkbox
                                                { ...input }
                                                name={input.name}
                                                id={`court-${item.uuid}${idRender}`}
                                                modif='b-checkbox--add-schedule'
                                                error={meta.error && meta.touched && meta.error}
                                            >
                                                <span>{item.name}</span>
                                            </Checkbox>
                                        }}
                                    />
                                </li>
                            })

                            : <li className="b-add-schedule-card__check-item">
                                <p style={{marginBottom: '15px'}}>Добавьте информацию о кортах, на которых работаете в разделе <Link className="b-add-schedule-card__link" to="/profile/trainer-info">
                                    «настройки»
                                    </Link>
                                </p>
                            </li>
                        }
                    </ul>
                </div>
                : null
                }
            </div>
        )
    }
}

export default AddScheduleCard;
