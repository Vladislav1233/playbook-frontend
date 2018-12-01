import React, { Component } from 'react';
import { connect } from "react-redux";

// Note: components
import SettingChooseDay from '../../components/SettingChooseDay/SettingChooseDay';
import Calendar from '../../components/Calendar';
import AddScheduleCard from '../../components/AddScheduleCard';
import Button from '../../components/ui-kit/Button/Button';

class TrainerAddSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [{
                dates: [],
                start_time: null, // Example 09:00:00
                end_time: null, // Example 17:00:00
                price_per_hour: '' // Example 7000 (70rub)
            }]
        }
    }

    createDataCard = (idx, name, value) => {
        return this.state.cards.map((card, sidx) => {
            if (idx !== sidx) return card;

            return {
                ...card,
                [name]: value
            }
        });
    }

    onChangeTime = (idx) => (value, name) => {
        const newCards = this.createDataCard(idx, name, value.formatted24);

        this.setState({
            ...this.state,
            cards: newCards
        })
    }

    onChangeInput = (idx) => (event) => {
        const { name, value } = event.target;
        
        const newCards = this.createDataCard(idx, name, value);

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
                start_time: null,
                end_time: null,
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
        console.log(this.state);

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
                            onChangeTime={this.onChangeTime(idx)}
                        />
                    ))}
                    
                    <Button 
                        name={'Добавить ещё'}
                        theme={{orange: true}}
                        onClick={this.handleAddCard}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(TrainerAddSchedule);
