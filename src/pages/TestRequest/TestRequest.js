import React, { Component } from 'react';

class TestRequest extends Component {
    
    registration = (event) => {
        event.preventDefault();

        let payload = {
            first_name: 'wityasq',
            last_name: 'wityas',
            phone: '+79178273459',
            password: '12345678123',
            c_password: '12345678123'
        }
        let data = new FormData();
        data.append( 'json', JSON.stringify( payload ) );

        fetch('http://207.154.236.8/api/register',
            {
                method: 'POST',
                body: data,
                mode: 'no-cors'
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
