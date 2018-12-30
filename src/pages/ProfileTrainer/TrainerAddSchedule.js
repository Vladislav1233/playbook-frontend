import React, { Component } from 'react';
import { connect } from "react-redux";
import { createScheduleTrainer, editTrainerSchedule, getTrainerSchedule } from '../../store/actions/schedule';
import moment from 'moment';
import 'moment/locale/ru';
import getArrayDateRange from '../../helpers/getArrayDateRange';
import { dataTime } from '../../helpers/dataTime';
import { scheduleService } from '../../services/scheduleService';

// Note: components
import SettingChooseDay from '../../components/SettingChooseDay/SettingChooseDay';
import Calendar from '../../components/Calendar';
import AddScheduleCard from '../../components/AddScheduleCard';
import Button from '../../components/ui-kit/Button/Button';

// Note: style
// import '../../style/bem-blocks/b-hint-profile/index.scss';
import '../../style/bem-blocks/b-trainer-add-schedule/index.scss';

class TrainerAddSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [{
                dates: [],
                start_time: null, // Example 09:00:00
                end_time: null, // Example 17:00:00
                price_per_hour: '', // Example 7000 (70rub)
                currency: 'RUB',
                schedule_id: -1
            }],
            selectChooseDay: 'one', // Note: это для настроек календаря: one - выбрать можно 1 день, period - выбрать можно период от / до
            dateCalendar: `${moment(new Date()).format('YYYY-MM-DD')}`
        }
    };

    componentDidMount() {
        const data = dataTime();
        this.getTrainerScheduleRequest(this.state.dateCalendar, data);
    }

    getTrainerScheduleRequest = (date, data) => {
        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const userId = localStorage.getItem('userId');

        scheduleService.getSchedule('trainer', userId, data)
            .then(
                response => {
                    if(response.data.data.length > 0) {
                        const answerData = response.data.data;
                        const newCards = answerData.map(item => {
                            return {
                                dates: [date],
                                start_time: moment(item.start_time).format("HH:mm"),
                                end_time: moment(item.end_time).format("HH:mm"),
                                price_per_hour: item.price_per_hour,
                                currency: 'RUB',
                                schedule_id: item.id
                            }
                        });

                        this.setState({
                            ...this.state,
                            cards: newCards
                        })
                    } else {
                        const newCards = [{
                                dates: [date],
                                start_time: null, // Example 09:00:00
                                end_time: null, // Example 17:00:00
                                price_per_hour: '', // Example 7000 (70rub)
                                currency: 'RUB',
                                schedule_id: -1
                            }];

                        this.setState({
                            ...this.state,
                            cards: newCards
                        })
                    }
                },
                error => {
                    console.log(error);
                }
            )
    }

    createDataCard = (idx, name, value) => {
        return this.state.cards.map((card, sidx) => {
            if (idx !== sidx) return card;

            return {
                ...card,
                [name]: value
            }
        });
    };

    onChangeTime = (idx) => (value, name) => {
        const newCards = this.createDataCard(idx, name, value.formatted24);

        this.setState({
            ...this.state,
            cards: newCards
        })
    };

    onChangeInput = (idx) => (event) => {
        const { name, value } = event.target;
        const newCards = this.createDataCard(idx, name, value);

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
                schedule_id: -1
            }])
        })
    };

    handleRemoveCard = (idx) => () => {
        if (this.state.cards.length === 1) {
            alert("Нельзя удалять последнюю карточку");
            return false;
        }

        this.setState({
            ...this.state,
            cards: this.state.cards.filter((s, sidx) => idx !== sidx)
        });
    };

    onClickDateCalendar = (value) => {
        const { selectChooseDay, cards } = this.state;

        if (selectChooseDay === 'one') {
            const date = moment(value).format('YYYY-MM-DD');
            // dateData(date);

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
                    schedule_id: -1
                }],
                selectChooseDay: value.value
            });
        };
    };

    onSubmitCreateSchedule = () => {
        const { dispatch } = this.props;

        // NOTE: Создается один запрос на одну карточку. Добавление расписания
        this.state.cards.forEach(function(card) {
            // TODO: преобразовать из копеек в рубли;
            let formatPrice = card.price_per_hour;
            // TODO: добавить чек-бокс playgrounds
            const dataForCreate = {
                dates: card.dates,
                start_time: `${card.start_time}:00`,
                end_time: `${card.end_time}:00`,
                price_per_hour: formatPrice,
                currency: card.currency,
                playgrounds: ['1']
            };

            const dataForEdit = {
                dates: card.dates,
                start_time: `${card.dates[0]} ${card.start_time}:00`,
                end_time: `${card.dates[0]} ${card.end_time}:00`,
                price_per_hour: formatPrice,
                currency: card.currency,
                playgrounds: ['1']
            };

            // Note: если у нас карточка с сервера, то у неё schedule_id 0 и больше, мы определяем какой запрос отправлять.
            const edit = async () => {
                if (card.schedule_id >= 0) {
                    dispatch(editTrainerSchedule(card.schedule_id, dataForEdit));
                }
            }

            const create = () => {
                if (card.schedule_id < 0) {
                    dispatch(createScheduleTrainer(dataForCreate));
                };
            };
            edit().then(() => {
                create();
            });
        });
    };

    render() {
        const { cards, selectChooseDay } = this.state;

        const optionsSelect = [{
            value: 'one',
            label: 'Один день'
        }, {
            value: 'period',
            label: 'Период (от - до)'
        }]

        return(
            <div className="b-trainer-add-schedule">
                {/*TODO: Это лучше сделать отдельной всплывающей подсказкой или сообщением
                <div className="b-hint-profile">Укажите дни, для которых установить время и добавьте свободные временные промежутки с ценой</div>*/}
                
                <div className="b-trainer-add-schedule__calendar">                
                    <Calendar 
                        selectRange={selectChooseDay === 'period' ? true : false}
                        returnValue={selectChooseDay === 'period' ? 'range' : 'start'}
                        onChange={this.onClickDateCalendar}
                    />
                </div>
                
                <div className="b-trainer-add-schedule__schedule">
                    <SettingChooseDay 
                        optionsSelect={optionsSelect}
                        getValueSelect={this.onSelectChooseDay}
                    />

                    {cards.map((card, idx) => (
                        <AddScheduleCard
                            key={idx}
                            data={card}
                            idRender={idx}
                            onChangeInput={this.onChangeInput(idx)}
                            onChangeTime={this.onChangeTime(idx)}
                            onRemoveCard={this.handleRemoveCard(idx)}
                        />
                    ))}

                    <div className="b-trainer-add-schedule__add-more">
                        <Button 
                            name={'Добавить ещё'}
                            theme={{orange: true}}
                            onClick={this.handleAddCard}
                        />
                    </div>

                    <div className="b-trainer-add-schedule__save"> 
                        <Button
                            modif="b-button--save"
                            name={'Сохранить'}
                            onClick={() => this.onSubmitCreateSchedule()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(TrainerAddSchedule);
