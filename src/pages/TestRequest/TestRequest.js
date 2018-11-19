import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    registration = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:8001/api/register',
            data: {
                first_name: 'wityasqsi',
                last_name: 'wityassa',
                phone: '9178273457',
                dial_code: "+7",
                password: '12345678123',
                c_password: '12345678123',
                is_trainer: '1'
            }
        });
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.registration}>
                    <button>Регистрация</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;