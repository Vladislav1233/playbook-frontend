import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
import { extendMoment } from 'moment-range';
import { ANALIZE_DATE_TIME_ZONE, ANALIZE_DATE_TIME } from '../../../store/constants/formatDates';
import { withRouter } from 'react-router-dom';

// Note: react-final-form
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

// Note: actions
import { createScheduleTrainer, editTrainerSchedule } from '../../../store/actions/schedule';
import { alertActions } from '../../../store/actions/alertAction';

// Note: services
import { scheduleService } from '../../../services/scheduleService';
import { trainerInfoService } from '../../../services/trainerInfoService';

// Note: helpers
import { dataTime } from '../../../helpers/dataTime';
// import getArrayDateRange from '../../../helpers/getArrayDateRange'; TODO (поиском ищи где используется)
import { convertTypeMoney } from '../../../helpers/convertTypeMoney';
import textErrorFromServer from '../../../helpers/textErrorFromServer';

// Note: components
// TODO_AMED: временно скрыли функционал отвалившийся
// import SettingChooseDay from '../../components/SettingChooseDay/SettingChooseDay';
import Calendar from '../../../components/Calendar';
import AddScheduleCard from '../../../components/AddScheduleCard';
import Button from '../../../components/ui-kit/Button/Button';
import Preloader from '../../../components/Preloader/Preloader';

// Note: style
import '../../../style/bem-blocks/b-trainer-add-schedule/index.scss';

const Moment = extendMoment(moment);

class TrainerAddSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            initialValuesCards: [{
                start_time: '',
                end_time: '',
                price_per_hour: '',
                uuid: ''
            }],
            selectChooseDay: 'one', // Note: это для настроек календаря: one - выбрать можно 1 день, period - выбрать можно период от / до
            dateCalendar: `${moment(new Date()).format('YYYY-MM-DD')}`,
            dateForRequest: [`${moment(new Date()).format('YYYY-MM-DD')}`],
            preloader: false
        };

        this.initialDataCards = this.state.initialValuesCards; 
    }

    componentDidMount() {
        this.setState({preloader: true});
        const data = dataTime();
        this.getTrainerScheduleRequest(this.state.dateCalendar, data);
    }

    getTrainerScheduleRequest = (date, data) => {
        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const { userId, match } = this.props;

        const getScheduleRequest = () => { 
            if (this.state.preloader !== true) {
                this.setState({ preloader: true });
            }
            scheduleService.getSchedule('playground', match.params.slug, data)
            .then(
                response => {
                    if(response.data.data.length > 0) {
                        const answerData = response.data.data;
                        const newInitialValuesCards = answerData.map(item => {
                            return {
                                start_time: moment(item.start_time, ANALIZE_DATE_TIME_ZONE).format("HH:mm"),
                                end_time: moment(item.end_time, ANALIZE_DATE_TIME_ZONE).format("HH:mm"),
                                price_per_hour: convertTypeMoney(item.price_per_hour, 'RUB', 'banknote'),
                                uuid: item.uuid
                            }
                        });

                        this.setState({
                            ...this.state,
                            initialValuesCards: newInitialValuesCards,
                            preloader: false
                        });
                    } else {
                        const newCards = [ ...this.initialDataCards ];

                        this.setState({
                            ...this.state,
                            initialValuesCards: newCards,
                            preloader: false
                        });
                    }
                },
                error => {
                    this.props.alertActionsError(textErrorFromServer(error));
                }
            )
        }
        getScheduleRequest();
    }

    // TODO: Вынести в отдельный обработчик валидации
    validateRangeCards = (arr) => {
        if(arr.length > 0) {
            const { dateForRequest } = this.state;

            let result = [];
            let isNotValid = false;

            for (let i = 0; i < arr.length; i++) {

                if(arr[i] && arr[i].start_time && arr[i].end_time) {
                    let startIsBefore = moment(arr[i].start_time, 'HH:mm').isBefore(moment(arr[i].end_time, 'HH:mm'));
                    if (!startIsBefore) {
                        return {curr: i, validate: i, startBeforeIsNotValid: true}
                    }

                    const startRange = `${dateForRequest[0]} ${arr[i].start_time}`;
                    const endRange = `${dateForRequest[0]} ${arr[i].end_time}`;
                    const currentCardRange = Moment.range(startRange, endRange); // для каждого элемента находим диапазон

                    for (let j = 0; j < result.length; j++) { 
                        isNotValid = currentCardRange.overlaps(result[j]);
                        if(isNotValid) {
                            return {curr: i, validate: j}
                        }
                    }
                    result.push(currentCardRange);
                }
            }
        }
        return undefined;
    };

    handleRemoveCard = (scheduleUuid) => {
        if(scheduleUuid) {
            scheduleService.deleteSchedule(scheduleUuid);
        };
    };

    onClickDateCalendar = (value) => {
        const { selectChooseDay, cards } = this.state;

        if (selectChooseDay === 'one') {
            const date = moment(value).format('YYYY-MM-DD');

            const data = dataTime({
                valueStart: value,
                valueEnd: value
            });
            this.setState({
                ...this.state,
                dateCalendar: value,
                dateForRequest: [`${date}`]
            })
            this.getTrainerScheduleRequest(date, data);
        }
    };

    // Note: настраиваем выбор даты на календаре с помощью селекта
    onSelectChooseDay = (value) => {
        if (value.value === 'one') {
            const date = moment(this.state.dateCalendar).format('YYYY-MM-DD');
            const data = dataTime({
                valueStart: this.state.dateCalendar,
                valueEnd: this.state.dateCalendar
            });
            this.setState({
                ...this.state,
                selectChooseDay: value.value
            });
            this.getTrainerScheduleRequest(date, data);
        } else {
            this.setState({
                ...this.state,
                initialDataCards: this.initialDataCards,
                selectChooseDay: value.value
            });
        }
    };

    onSubmitCreateSchedule = (values) => {
        const { dispatch } = this.props;

        const getSchedule = (index, array) => {
            if(index === array.length - 1) {
                const dataForGet = dataTime({
                    valueStart: this.state.dateCalendar,
                    valueEnd: this.state.dateCalendar
                });
                const dateForGet = moment(this.state.dateCalendar).format('YYYY-MM-DD');
    
                this.getTrainerScheduleRequest(dateForGet, dataForGet);
            }
        };

        values.scheduleCard.some((value, index, array) => {
            let formatPrice = convertTypeMoney(value.price_per_hour, 'RUB', 'coin');

            // Note: Функция, которая генерирует данные по расписанию как для create так и для edit для отправки на сервер.
            const createDataForRequest = (datesRequest, startTimeRequest, endTimeRequest) => {
                let result = {
                    price_per_hour: formatPrice,
                    currency: 'RUB',
                    playgrounds: [`${this.props.match.params.slug}`]
                };

                if (datesRequest) {
                    result.dates = datesRequest;
                }

                if (startTimeRequest) {
                    result.start_time = startTimeRequest
                }

                if (endTimeRequest) {
                    result.end_time = endTimeRequest
                }

                return result;
            };

            // Note: Получаем даты начала расписания и окончания расписания относительно UTC
            const dates = this.state.dateForRequest.map(date => {
                return {
                    start_time: moment.utc(
                                moment(`${date} ${value.start_time}:00`, ANALIZE_DATE_TIME)
                            ).format('YYYY-MM-DD HH:mm:ss'),
                    end_time: moment.utc(
                                moment(`${date} ${value.end_time}:00`, ANALIZE_DATE_TIME)
                            ).format('YYYY-MM-DD HH:mm:ss')
                }
            });

            // Note: если у нас карточка с сервера, то у неё schedule_uuid не пустая строка, мы определяем какой запрос отправлять.
            const edit = async () => {
                if (value.uuid) {
                    dispatch(editTrainerSchedule(
                        value.uuid,  
                        createDataForRequest(null, dates[0].start_time, dates[0].end_time)
                    ))
                    .then(
                        response => {
                            if(response.response) {
                                this.props.alertActionsError(textErrorFromServer(response));
                            } else if(response.status === 200) {
                                this.props.alertActionsSuccess('Успешно сохранено');
                                getSchedule(index, array);
                            }
                        });
                }
                await create();
            }

            const create = () => {
                if (!value.uuid) {
                    dispatch(createScheduleTrainer(createDataForRequest(dates, null, null), 'playground')).then(
                        response => {
                            if(response.response) {
                                this.props.alertActionsError(textErrorFromServer(response));
                            } else if(response.status === 200) {
                                this.props.alertActionsSuccess('Успешно сохранено');
                                getSchedule(index, array);
                            }
                        }
                    );
                }
            };
            edit();
        })
    };

    render() {
        const { 
            initialValuesCards,
            selectChooseDay,
            preloader
        } = this.state;

        const {
            preloaderSchedule
        } = this.props;

        let pushForm;
        let submitSchedule;
        console.log(this.props)

        // TODO: Сделать валидацию сабмита для периода и тогда включить опцию
        // const optionsSelect = [{
        //     value: 'one',
        //     label: 'Один день'
        // }, {
        //     value: 'period',
        //     label: 'Период (от - до)'
        // }];

        return(
            <div className="b-trainer-add-schedule">
                <Calendar 
                    selectRange={selectChooseDay === 'period' ? true : false}
                    returnValue={selectChooseDay === 'period' ? 'range' : 'start'}
                    onChange={this.onClickDateCalendar}
                />
                
                <div className="b-trainer-add-schedule__schedule">
                    <h1>Управление площадкой</h1>
                    
                    {/* TODO_AMED: временно скрыли функционал отвалившийся */}
                    {/* <SettingChooseDay 
                        optionsSelect={optionsSelect}
                        getValueSelect={this.onSelectChooseDay}
                    /> */}

                    
                    <Form 
                        onSubmit={this.onSubmitCreateSchedule}
                        mutators={{
                            ...arrayMutators
                        }}
                        initialValues={{
                            scheduleCard: [ ...initialValuesCards ]
                        }}
                        validate={values => {
                            const errors = {
                                scheduleCard: []
                            };

                            const textErrorRange = (numCard) => 
                                `В карточках №${numCard.validate + 1} и №${numCard.curr + 1} диапазон времени пересекается`;
                            const textErrorForIsStartNotBefor = 'Время начала бронированя должно быть раньше времени окончания.';

                            let howOverlaps = this.validateRangeCards(values.scheduleCard);

                            const errorFieldForRange = () => {
                                return { 
                                    start_time: howOverlaps.startBeforeIsNotValid 
                                        ? textErrorForIsStartNotBefor : textErrorRange(howOverlaps),

                                    end_time: howOverlaps.startBeforeIsNotValid 
                                        ? textErrorForIsStartNotBefor : textErrorRange(howOverlaps),

                                    invalidRanges: true
                                }
                            };
                            if (howOverlaps !== undefined) {
                                errors.scheduleCard[howOverlaps.curr] = errorFieldForRange()
                                errors.scheduleCard[howOverlaps.validate] = errorFieldForRange()
                            }

                            return errors;
                        }}
                        render={({ 
                            handleSubmit, 
                            values, 
                            errors, 
                            touched, 
                            form: {
                                mutators: { push }
                            }
                        }) => {
                            pushForm = push;
                            submitSchedule = handleSubmit;
                            return (
                                <form className="b-add-schedule-card__list" onSubmit={handleSubmit}>
                                    <FieldArray name="scheduleCard">
                                        {({ fields, meta }) => {
                                            return fields.map((name, index) => {
                                                return <AddScheduleCard
                                                    metaForm={meta.error[index]}
                                                    key={name}
                                                    name={name}
                                                    idRender={index}
                                                    remove={() => {
                                                        initialValuesCards[index] 
                                                            ? this.handleRemoveCard(initialValuesCards[index].uuid)
                                                            : undefined;

                                                        fields.remove(index)
                                                    }}
                                                />
                                            }) 
                                        }}
                                    </FieldArray>
                                </form>
                            )
                        }}
                    />

                    <div className="b-trainer-add-schedule__save"> 
                        <Button
                            modif="b-button--save"
                            name='Сохранить'
                            onClick={(event) => submitSchedule(event)}
                        />

                        <Button
                            modif="b-button--add-more"
                            name={'Добавить ещё'}
                            theme={{ orange: true }}
                            onClick={() => pushForm('scheduleCard', undefined)}
                        />
                    </div>
                </div>

                {preloader || preloaderSchedule ? <Preloader /> : null}
            </div>
        )
    }
}

const mapStateToProps = ({ scheduleTrainer, identificate }) => {
    return {
        userId: identificate.userId,
        preloaderSchedule: scheduleTrainer.preloader
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        alertActionsError: (message) => dispatch( alertActions.error(message) ),
        alertActionsSuccess: (message) => dispatch( alertActions.success(message) ),
        dispatch: (action) => dispatch(action)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainerAddSchedule));
