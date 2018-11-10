import React, { Component } from 'react';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';

class Registration extends Component {
    state = {
        user: {
            first_name: '',
            last_name: '',
            phone: '',
            password: '',
            c_password: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        })

        console.log(name);
        console.log(value);
    }

    render() {
        const { user } = this.state;

        return(
            <div className="b-registration">
                <div className="container">
                    <form className="b-registration__form">
                        {/*props { labelText, typeInput, idInput, placeholder, value } */}
                        <Input 
                            labelText="Имя"
                            placeholder="Ваше имя"
                            typeInput="text"
                            idInput="first_name"
                            value={user.firstName}
                            onChange={this.handleChange}
                        />

                        <Input 
                            labelText="Фамилия"
                            placeholder="Ваша фамилия"
                            typeInput="text"
                            idInput="last_name"
                            value={user.lastName}
                            onChange={this.handleChange}
                        />

                        {/*TODO: Сделать маску для номера телефона (для разных стран) */}
                        <Input 
                            labelText="Номер телефона"
                            placeholder="Номер телефона"
                            typeInput="number"
                            idInput="phone"
                            value={user.numberTelephone}
                            onChange={this.handleChange}
                        />

                        <Input 
                            labelText="Пароль"
                            placeholder="Пароль"
                            typeInput="password"
                            idInput="password"
                            value={user.password}
                            onChange={this.handleChange}
                        />

                        <Input 
                            labelText="Повторите пароль"
                            placeholder="Повторите пароль"
                            typeInput="c_password"
                            idInput="registration_c-password"
                            value={user.cPassword}
                            onChange={this.handleChange}
                        />
                        
                        {/* { name, id, text, value, checked } */}
                        <Checkbox 
                            name="registration_check-trainer"
                            id="registration_check-trainer"
                            text="Я тренер"
                            value="Я тренер"
                        />

                        <button>Зарегистрироваться</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registration;