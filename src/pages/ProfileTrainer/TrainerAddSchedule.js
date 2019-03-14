import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/ru';
import { extendMoment } from 'moment-range';

// Note: actions
import { createScheduleTrainer, editTrainerSchedule, toggleResponse } from '../../store/actions/schedule';
import { alertActions } from '../../store/actions/alertAction';

// Note: services
import { scheduleService } from '../../services/scheduleService';
import { trainerInfoService } from '../../services/trainerInfoService';

// Note: helpers
import { dataTime } from '../../helpers/dataTime';
import getArrayDateRange from '../../helpers/getArrayDateRange';
import { convertTypeMoney } from '../../helpers/convertTypeMoney';

// Note: components
import SettingChooseDay from '../../components/SettingChooseDay/SettingChooseDay';
import Calendar from '../../components/Calendar';
import AddScheduleCard from '../../components/AddScheduleCard';
import Button from '../../components/ui-kit/Button/Button';
import Preloader from '../../components/Preloader/Preloader';

// Note: style
// import '../../style/bem-blocks/b-hint-profile/index.scss';
import '../../style/bem-blocks/b-trainer-add-schedule/index.scss';

const Moment = extendMoment(moment);

class TrainerAddSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [{
                dates: [],
                start_time: null,
                end_time: null,
                price_per_hour: '',
                currency: 'RUB',
                schedule_uuid: '',
                playgrounds: [],
                playgroundsCheck: [],
                errorCardText: ''
            }],
            selectChooseDay: 'one', // Note: это для настроек календаря: one - выбрать можно 1 день, period - выбрать можно период от / до
            dateCalendar: `${moment(new Date()).format('YYYY-MM-DD')}`,
            successPostResponse: false,
            playgroundsForTraining: [],
            preloader: false,
            isNotValidCards: false
        }

        this.initialDataCards = this.state.cards; 
    };

    static getDerivedStateFromProps(props, state) {
        if(props.successPostResponse === true) {
            return {
                ...state,
                successPostResponse: true
            }
        } else {
            return {
                ...state,
                successPostResponse: false
            }
        }
    }

    componentDidMount() {
        this.setState({preloader: true});
        // const data = dataTime();
        // this.getTrainerScheduleRequest(this.state.dateCalendar, data);
    }

    componentDidUpdate() {
        if(this.state.successPostResponse === true) {
            const dataForGet = dataTime({
                valueStart: this.state.dateCalendar,
                valueEnd: this.state.dateCalendar
            });
            const dateForGet = moment(this.state.dateCalendar).format('YYYY-MM-DD');

            this.getTrainerScheduleRequest(dateForGet, dataForGet);
        };
    }

    getTrainerScheduleRequest = (date, data) => {
        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const { userId } = this.props;

        const getScheduleRequest = () => { 
            if (this.state.preloader !== true) {
                this.setState({preloader: true});
            };

            scheduleService.getSchedule('trainer', userId, data)
            .then(
                response => {
                    this.props.dispatch(toggleResponse());
                    if(response.data.data.length > 0) {
                        const answerData = response.data.data;
                        const newCards = answerData.map(item => {
                            return {
                                dates: [date],
                                start_time: moment(item.start_time).format("HH:mm"),
                                end_time: moment(item.end_time).format("HH:mm"),
                                price_per_hour: convertTypeMoney(item.price_per_hour, 'RUB', 'banknote'),
                                currency: 'RUB',
                                schedule_uuid: item.uuid,
                                playgrounds: this.state.playgroundsForTraining,
                                playgroundsCheck: item.playgrounds.map(item => item.uuid),
                                errorCardText: ''
                            }
                        });

                        this.setState({
                            ...this.state,
                            cards: newCards,
                            preloader: false
                        });
                    } else {
                        const newCards = [{
                                dates: [date],
                                start_time: null,
                                end_time: null,
                                price_per_hour: '',
                                currency: 'RUB',
                                schedule_uuid: '',
                                playgrounds: this.state.playgroundsForTraining,
                                playgroundsCheck: [],
                                errorCardText: ''
                            }];

                        this.setState({
                            ...this.state,
                            cards: newCards,
                            preloader: false
                        });
                    }
                },
                error => {
                    console.log(error);
                }
            )
        }

        if (this.state.playgroundsForTraining.length === 0) {

            trainerInfoService.getTrainerInformation(userId)
                .then(
                    res => {
                        this.setState({
                            ...this.state,
                            playgroundsForTraining: res.data.data.playgrounds
                        }, getScheduleRequest())
                    },
                    error => {
                        console.log(error);
                    }
                );
        } else {
            getScheduleRequest();
        };
    }

    createDataCard = (idx, name, value) => {
        /*
        * idx - индекс в массиве карточки, которую правят.
        */
        const { cards } = this.state;

        return cards.map((card, sidx) => {
            // Note: Если карточки нет ещё то создается новая
            if (idx !== sidx) return card;

            // Note: Если карточка есть то она редактируется
            return {
                ...card,
                [name]: value
            }
        });
    };

    onChangeTime = (idx) => (value, name) => {
        const newCards = this.createDataCard(idx, name, value);

        const validationRange = (currCard) => {
            
            if(currCard.start_time && currCard.end_time) {
                const startRange = `${currCard.dates[0]} ${currCard.start_time}`;
                const endRange = `${currCard.dates[0]} ${currCard.end_time}`;
                const currentCardRange = Moment.range(startRange, endRange);

                if(moment(startRange).isBefore(endRange)) {
                    let numberCardWithError = null;
                    let isNotValidRange = newCards.some((validationCard, indexValidationCard) => {
                        if (idx !== indexValidationCard) {
                            const startRangeValidation = `${validationCard.dates[0]} ${validationCard.start_time}`;
                            const endRangeValidation = `${validationCard.dates[0]} ${validationCard.end_time}`;
                            const validationCardRange = Moment.range(startRangeValidation, endRangeValidation);
                            
                            numberCardWithError = indexValidationCard;

                            return currentCardRange.overlaps(validationCardRange);
                        };

                        return false;
                    });

                    if(isNotValidRange) {
                        newCards[idx].errorCardText = `Диапазон этой карточки пересекается с карточкой №${numberCardWithError + 1}`;

                        this.setState({
                            isNotValidCards: true
                        });
                    } else {
                        newCards[idx].errorCardText = '';
                        this.setState({
                            isNotValidCards: false
                        });
                    };

                } else {
                    newCards[idx].errorCardText = 'Проверьте временные границы. Время окончания должно быть больше.';
                    this.setState({
                        isNotValidCards: true
                    });
                }
            } else {
                newCards[idx].errorCardText = 'Укажите время начала и окончания тренировки.';
                this.setState({
                    isNotValidCards: true
                });
            };
        };

        
        this.setState(() => {
            validationRange(newCards[idx]);
            return {
                cards: newCards
            };
        });
    };

    onChangeInput = (idx) => (event) => {
        const { name, value } = event.target;
        const newCards = this.createDataCard(idx, name, value);

        this.setState({
            ...this.state,
            cards: newCards
        });
    };

    onChangeCheckbox = (idx) => (event) => {
        const { name, checked } = event.target;
        let newPlaygroundsCheck = this.state.cards[idx].playgroundsCheck;

        if (checked) {
            newPlaygroundsCheck = [...newPlaygroundsCheck, name];
        } else {
            newPlaygroundsCheck = newPlaygroundsCheck.filter(item => {
                return item !== name;
            })
        };

        const newCards = this.createDataCard(idx, 'playgroundsCheck', newPlaygroundsCheck);

        this.setState({
            ...this.state,
            cards: newCards
        });
    };

    // Note: Добавляем ещё одну карточку для заполения расписания
    handleAddCard = () => {
        this.setState({
            ...this.state,
            cards: this.state.cards.concat([{
                dates: this.state.cards[0].dates,
                start_time: null,
                end_time: null,
                price_per_hour: '',
                currency: 'RUB',
                schedule_uuid: '',
                playgrounds: this.state.playgroundsForTraining,
                playgroundsCheck: [],
                errorCardText: ''
            }])
        })
    };

    handleRemoveCard = (idx) => () => {
        const { cards } = this.state;

        //  Note: если карточка с сервера то удаляем её совсем
        if (cards[idx].schedule_uuid) {
            scheduleService.deleteSchedule(cards[idx].schedule_uuid);
        };

        // Note: если последняя карточка с сервера, то очищаем её.
        if (cards.length === 1 && cards[idx].schedule_uuid) {
            this.setState({
                ...this.state,
                cards: this.initialDataCards
            })
        } else if(cards.length === 1) {
            alert("Нельзя удалять последнюю карточку");
            return false;
        } else {
            this.setState({
                ...this.state,
                cards: cards.filter((s, sidx) => idx !== sidx)
            });
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
                dateCalendar: value
            })
            this.getTrainerScheduleRequest(date, data);
        }

        if (selectChooseDay === 'period') {
            // Note: собираем данные по дате для post запроса create schedule
            const dateData = (dateData) => {
                const newCards = cards.map((card) => {
                    return {
                        ...card,
                        dates: dateData
                    }
                });

                this.setState({
                    cards: newCards
                })
            }
            dateData(getArrayDateRange(value[0], value[1]));
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
                cards: [{
                    dates: [],
                    start_time: null,
                    end_time: null,
                    price_per_hour: '',
                    currency: 'RUB',
                    schedule_uuid: '',
                    playgrounds: this.state.playgroundsForTraining,
                    playgroundsCheck: [],
                    errorCardText: ''
                }],
                selectChooseDay: value.value
            });
        };
    };

    onSubmitCreateSchedule = () => {
        const { dispatch } = this.props;
        
        if(!this.state.isNotValidCards) {
            let isValidCards = this.state.cards.every((card, indexCard) => {
                if(card.start_time && card.end_time && card.playgroundsCheck.length > 0 && card.price_per_hour) {
                    return true
                };

                this.props.alertActionsError('Не сохранено! Исправьте ошибки, указанные в карточках расписания, и попробуйте ещё раз.');
                const newCardsWithError = [...this.state.cards];
                newCardsWithError[indexCard].errorCardText = 'Все поля должны быть заполнены.';
                this.setState({
                    cards: newCardsWithError
                });
                return false
            });

            if (isValidCards) {
                // NOTE: Создается один запрос на одну карточку. Добавление расписания
                this.state.cards.forEach((card, indexCard, arrayCards) => {
                    let formatPrice = convertTypeMoney(card.price_per_hour, 'RUB', 'coin');

                    // Note: Функция, которая генерирует данные по расписанию как для create так и для edit для отправки на сервер.
                    const createDataForRequest = (datesRequest, startTimeRequest, endTimeRequest) => {
                        let result = {
                            price_per_hour: formatPrice,
                            currency: card.currency,
                            playgrounds: card.playgroundsCheck  
                        };

                        if (datesRequest) {
                            result.dates = datesRequest;
                        };

                        if (startTimeRequest) {
                            result.start_time = startTimeRequest
                        };

                        if (endTimeRequest) {
                            result.end_time = endTimeRequest
                        };

                        return result;
                    };

                    // Note: Получаем даты начала расписания и окончания расписания относительно UTC
                    const dates = card.dates.map(date => {
                        return {
                            start_time: moment.utc(moment(`${date} ${card.start_time}:00`)).format('YYYY-MM-DD HH:mm:ss'),
                            end_time: moment.utc(moment(`${date} ${card.end_time}:00`)).format('YYYY-MM-DD HH:mm:ss')
                        }
                    });

                    // Note: если у нас карточка с сервера, то у неё schedule_uuid не пустая строка, мы определяем какой запрос отправлять.
                    const edit = async () => {
                        if (card.schedule_uuid) {
                            dispatch(editTrainerSchedule(
                                card.schedule_uuid,  
                                createDataForRequest(null, dates[0].start_time, dates[0].end_time)
                            ));
                        }
                        await create();
                    }

                    const create = () => {
                        if (!card.schedule_uuid) {
                            dispatch(createScheduleTrainer(createDataForRequest(dates, null, null)));
                        };
                    };

                    edit();
                });

                this.props.alertActionsSuccess('Расписание сохранено.');
            };
        } else {
            this.props.alertActionsError('Не сохранено! Исправьте ошибки, указанные в карточках расписания, и попробуйте ещё раз.');
        };
    };

    render() {
        const { 
            cards, 
            selectChooseDay,
            preloader 
        } = this.state;

        const {
            preloaderSchedule
        } = this.props;

        // TODO: Сделать валидацию сабмита для периода и тогда включить опцию
        // const optionsSelect = [{
        //     value: 'one',
        //     label: 'Один день'
        // }, {
        //     value: 'period',
        //     label: 'Период (от - до)'
        // }];

        const optionsSelect = [{
            value: 'one',
            label: 'Один день'
        }];

        return(
            <div className="b-trainer-add-schedule">
                <Calendar 
                    selectRange={selectChooseDay === 'period' ? true : false}
                    returnValue={selectChooseDay === 'period' ? 'range' : 'start'}
                    onChange={this.onClickDateCalendar}
                />
                
                <div className="b-trainer-add-schedule__schedule">
                    <h1>Добавить расписание</h1>

                    <SettingChooseDay 
                        optionsSelect={optionsSelect}
                        getValueSelect={this.onSelectChooseDay}
                    />

                    <div className="b-add-schedule-card__list">
                        {cards.map((card, idx) => (
                            <AddScheduleCard
                                key={idx}
                                data={card}
                                idRender={idx}
                                onChangeInput={this.onChangeInput(idx)}
                                onChangeTime={this.onChangeTime(idx)}
                                onRemoveCard={this.handleRemoveCard(idx)}
                                playgroundsForTraining={card.playgrounds}
                                onChangeCheckbox={this.onChangeCheckbox(idx)}
                            />
                        ))}
                    </div>

                    {/* <div className="b-trainer-add-schedule__add-more">
                        <Button 
                            name={'Добавить ещё'}
                            theme={{orange: true}}
                            onClick={this.handleAddCard}
                        />
                    </div> */}

                    <div className="b-trainer-add-schedule__save"> 
                        <Button
                            modif="b-button--save"
                            name={'Сохранить'}
                            onClick={() => this.onSubmitCreateSchedule()}
                        />

                        <Button
                            modif="b-button--add-more"
                            name={'Добавить ещё'}
                            theme={{ orange: true }}
                            onClick={this.handleAddCard}
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
        successPostResponse: scheduleTrainer.successPostResponse,
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

export default connect(mapStateToProps, mapDispatchToProps)(TrainerAddSchedule);
