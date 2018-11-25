import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    request = (event) => {
        event.preventDefault();

        // {
        //     "about": "Short information about trainer",
        //     "min_price": "Min price in cents. Example: 7000. (70RUB)",
        //     "max_price": "Max price in cents.",
        //     "currency": "Currency: RUB, UAH, USD, etc. Default: RUB"
        // }
        // /api/trainer-info/create
        let valueToken = localStorage.getItem('userToken');
        console.log(valueToken);

        axios({
            method: 'post',
            url: 'http://playbook.ga/api/trainer-info/create',
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "about": "Я супер тренер",
                "min_price": "7000",
                "max_price": "10000",
                "currency": "RUB" 
              }
        }).then(response => {
            console.log(response);
        });
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.request}>
                    <button>Информация о тренере</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;