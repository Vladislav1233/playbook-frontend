import React, { Component } from 'react';

// Note: components
import Input from '../../components/ui-kit/Input/Input';
import Textarea from '../../components/ui-kit/Textarea';

class TrainerInfo extends Component {

    state = {
        trainerInfo: {
            name: '',
            patronymic: '',
            surname: '',
            about: '',
            minPrice: '',
            maxPrice: ''
        }
    }

    handleChangeInput = (event) => {
        const { name, value } = event.target;
        const { trainerInfo } = this.state;

        this.setState({
            trainerInfo: {
                ...trainerInfo,
                [name]: value
            }
        })
    }
    render() {
        // const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme } = this.props;
        const { trainerInfo } = this.state;

        return(
            <div className="b-trainer-info">
                
                <Input 
                    labelText="Имя"
                    idInput="profile_name"
                    nameInput="name"
                    placeholder="Имя"
                    value={trainerInfo.name}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Input 
                    labelText="Отчество"
                    idInput="profile_patronymic"
                    nameInput="patronymic"
                    placeholder="Отчество"
                    value={trainerInfo.patronymic}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Input 
                    labelText="Фамилия"
                    idInput="profile_surname"
                    nameInput="surname"
                    placeholder="Фамилия"
                    value={trainerInfo.surname}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Textarea
                    typeInput=""
                    labelText="О себе"
                    idInput="profile_about"
                    nameInput="about"
                    placeholder="О себе"
                    value={trainerInfo.about}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <div className="b-trainer-info__cost">
                    <div className="b-trainer-info__title-field">Стоимость часа</div>

                    <div className="b-trainer-info__cost-field">
                        <Input
                            idInput="profile_min-price"
                            nameInput="min-price"
                            placeholder="Минимальная"
                            value={trainerInfo.minPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                        />
                    </div>
                    <div className="b-trainer-info__cost-field">
                        <Input
                            idInput="profile_max-price"
                            nameInput="max-price"
                            placeholder="Максимальная"
                            value={trainerInfo.maxPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                        />
                    </div>
                </div>

                <div className="b-trainer-info__playground">
                    <div className="b-trainer-info__title-field">Список кортов, на которых вы тренируете</div>
                </div>
            </div>
        )
    }
}

export default TrainerInfo;