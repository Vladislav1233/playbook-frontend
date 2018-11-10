import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';
import { userActions } from '../../store/actions/userAction';

class Registration extends Component {
    state = {
        user: {
            first_name: '',
            last_name: '',
            phone: '',
            password: '',
            c_password: ''
        },
        submitted: false
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

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({submitted: true});
        const { user } = this.state;
        const { dispatch } = this.props;

        console.log(user.first_name && user.last_name && user.phone && user.password && user.c_password);

        // TODO: в условии сделать валидацию заполненных полей
        if (true) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user } = this.state;

        return(
            <div className="b-registration">
                <div className="container">
                    <form name='register-user' onSubmit={this.handleSubmit} className="b-registration__form">
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
                            typeInput="text"
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
                            typeInput="password"
                            idInput="c_password"
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

export default connect()(Registration);