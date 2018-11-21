import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    registration = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://207.154.236.8/api/register',
            data: {
                first_name: 'wityasqsiasa',
                last_name: 'wityassaasaa',
                phone: '9178103157',
                dial_code: "+7",
                password: '123452678121dd',
                c_password: '123452678121dd',
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