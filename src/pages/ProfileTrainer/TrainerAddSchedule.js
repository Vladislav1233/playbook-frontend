import React, { Component } from 'react';
import { connect } from "react-redux";

// Note: components
import SettingChooseDay from '../../components/SettingChooseDay/SettingChooseDay';
import Calendar from '../../components/Calendar';
import AddScheduleCard from '../../components/AddScheduleCard';

class TrainerAddSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [{
                dates: [],
                start_time: '', // Example 09:00:00
                end_time: '', // Example 17:00:00
                price_per_hour: '' // Example 7000 (70rub)
            }]
        }
    }

    onChangeInput = (idx) => (event) => {
        const { name, value } = event.target;
        
        const newCards = this.state.cards.map((card, sidx) => {
            if (idx !== sidx) return card;

            return {
                ...card,
                [name]: value
            }
        });

        this.setState({
            ...this.state,
            cards: newCards
        });
    }

    // Note: Добавляем ещё одну карточку для заполения расписания
    handleAddCard = () => {
        this.setState({
            ...this.state,
            cards: this.state.cards.concat([{
                dates: [],
                start_time: '',
                end_time: '',
                price_per_hour: ''
            }])
        })
    }

    handleRemoveCard = (idx) => () => {
        this.setState({
            ...this.state,
            cards: this.state.cards.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        const { cards } = this.state;

        return(
            <div className="b-trainer-add-schedule">
                <div className="b-hint-profile">Укажите дни, для которых установить время и добавьте свободные временные промежутки с ценой</div>
                
                <div className="b-trainer-add-schedule__calendar">                
                    <Calendar />
                </div>
                
                <div className="b-trainer-add-schedule__schedule">
                    <SettingChooseDay />

                    {cards.map((card, idx) => (
                        <AddScheduleCard
                            key={idx}
                            data={card}
                            idRender={idx}
                            onChangeInput={this.onChangeInput(idx)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default connect()(TrainerAddSchedule);
