import React, { Component } from 'react';
// import { connect } from 'react-redux';

// components
import Input from '../../components/ui-kit/Input/Input';
import Button from '../../components/ui-kit/Button/Button';
import InputMask from 'react-input-mask';
import Preloader from '../../components/Preloader/Preloader';

class Auth extends Component {
    state = {
        user: {
            phone: '',
            password: ''
        },
        validation: {
            text: '',
            fieldEmpty: false,
            numberTel: 18 // Note: необходимое количество символов в номере телефона
        },
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user, validation } = this.state;
        
        // Note: Если была ошибка валидации и пользователь начинает изменять поля, то скрываем ошибку
        if (validation.text !== '') {
            this.setState({
                validation: {
                    ...validation,
                    text: ''
                }
            })
        }

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user, validation } = this.state;
        // const { dispatch } = this.props;

        // Note: Проверяем все ли поля заполнены
        for (let key in user) {
            if (!Boolean(user[key])) {
                this.setState({
                    validation: {
                        ...validation,
                        text: 'Все поля должны быть заполнены',
                        fieldEmpty: true
                    }
                })
                
                return false;
            }
        }

        // Note: Проверяем ввел ли пользователь достаточное количество символов для номера телефона
        // TODO: сделать такую проверку для всех стран
        if (user.phone.length !== 18) {
            this.setState({
                validation: {
                    ...validation,
                    text: 'Недостаточное количество цифр номера телефона',
                    numberTel: true
                }
            })

            return false;
        }

        // const userRequestData = {
        //     ...this.state.user
        // }
        // Note: Убираем символ + у номера телефона
        // userRequestData.phone = userRequestData.phone.replace(/\D/g, "");
    }

    render() {
        const { user, validation} = this.state;
        const { preloader } = this.props;

        return (
            <div className="b-registration">
                <div className="container">
                    <form className="b-registration__form" name="authorization">
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

                        <div className="b-registration__button-wrapper">
                            {/* { name } */}
                            <Button 
                                name={'Войти'}
                            />

                            {validation.fieldEmpty || validation.confirmPassword ?
                                <div className="b-registration__error">{validation.text}</div>
                                :
                                null
                            }
                        </div>
                    </form>
                </div>
                {preloader 
                    ? <Preloader />
                    : null
                }
            </div>
        )
    }
}

export default Auth;
