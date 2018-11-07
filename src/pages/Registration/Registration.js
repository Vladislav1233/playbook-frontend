import React, { Component } from 'react';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';

class Registration extends Component {
    render() {
        return(
            <div className="b-registration">
                <div className="container">
                    <form className="b-registration__form">
                        {/*props { labelText, typeInput, idInput, placeholder } */}
                        <Input 
                            labelText="Имя"
                            placeholder="Ваше имя"
                            typeInput="text"
                            idInput="registration_name"
                        />

                        <Input 
                            labelText="Фамилия"
                            placeholder="Ваша фамилия"
                            typeInput="text"
                            idInput="registration_last-name"
                        />

                        {/*TODO: Сделать маску для номера телефона (для разных стран) */}
                        <Input 
                            labelText="Номер телефона"
                            placeholder="Номер телефона"
                            typeInput="number"
                            idInput="registration_telephone"
                        />

                        <Input 
                            labelText="Пароль"
                            placeholder="Пароль"
                            typeInput="password"
                            idInput="registration_password"
                        />

                        <Input 
                            labelText="Повторите пароль"
                            placeholder="Повторите пароль"
                            typeInput="password"
                            idInput="registration_c-password"
                        />
                        
                        {/* { name, id, text, value, checked } */}
                        <Checkbox 
                            name="registration_check-trainer"
                            id="registration_check-trainer"
                            text="Я тренер"
                            value="Я тренер"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Registration;