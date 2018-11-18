import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';
import { userActions } from '../../store/actions/userAction';
import Button from '../../components/ui-kit/Button/Button';
import InputMask from 'react-input-mask';

// style
import '../../style/bem-blocks/b-registration/index.scss';

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
                        {/*props { labelText?, typeInput, idInput, placeholder, value } */}
                        <Input
                            placeholder="Ваше имя"
                            typeInput="text"
                            idInput="first_name"
                            value={user.first_name}
                            onChange={this.handleChange}
                        />

                        <Input
                            placeholder="Ваша фамилия"
                            typeInput="text"
                            idInput="last_name"
                            value={user.last_name}
                            onChange={this.handleChange}
                        />

                        {/*TODO: Сделать маску для номера телефона (для разных стран) */}
                        {/* <InputMask mask="+7 (999) 999-99-99" value={user.numberTelephone} onChange={this.handleChange}>
                            {(inputProps) => <Input {...inputProps} type="tel"/>}
                        </InputMask> */}

                        <div className="b-input">
                            <InputMask className="b-input__input" id="phone" name="phone" mask="+7 (999) 999-99-99" maskChar={null} value={user.phone} onChange={this.handleChange} placeholder="Ваш номер телефона" />
                        </div>

                        <Input
                            placeholder="Пароль"
                            typeInput="password"
                            idInput="password"
                            value={user.password}
                            onChange={this.handleChange}
                        />

                        <Input
                            placeholder="Повторите пароль"
                            typeInput="password"
                            idInput="c_password"
                            value={user.c_password}
                            onChange={this.handleChange}
                        />
                        
                        {/* { name, id, text, value, checked, modif } */}
                        <Checkbox 
                            name="registration_check-trainer"
                            id="registration_check-trainer"
                            text="Я тренер"
                            value="Я тренер"
                            checked={true}
                            modif={'b-checkbox--hide'}
                        />
                        
                        <div className="b-registration__button-wrapper">
                            {/* { name } */}
                            <Button 
                                name={'Зарегистрироваться'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(Registration);