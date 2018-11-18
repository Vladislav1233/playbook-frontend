import React, { Component } from 'react';

class TestRequest extends Component {
    
    registration = (event) => {
        event.preventDefault();

        let payload = {
            first_name: 'wityasqsi',
            last_name: 'wityassa',
            phone: '9178273457',
            dial_code: "+7",
            password: '12345678123',
            c_password: '12345678123',
            is_trainer: '1'
        }

        fetch('http://207.154.236.8/api/register',
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        )
    }
    
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