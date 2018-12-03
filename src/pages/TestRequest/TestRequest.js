import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    request = (event) => {
        event.preventDefault();

        // {
        //     "dates": "Array with dates of periods. Example: [2018-05-12, 2018-05-13]",
        //     "start_time": "Period start time. Example: 09:00:00",
        //     "end_time": "Period end time. Example: 17:00:00",
        //     "price_per_hour": "Price per hour in cents. Example: 7000. (70RUB)",
        //     "currency": "Currency: RUB, UAH, USD, etc. Default: RUB"
        //   }
        // /api/schedule/trainer/create
        let valueToken = localStorage.getItem('userToken');
        let valueRole = localStorage.getItem('userRole');
        console.log(valueToken);
        console.log(valueRole);

        axios({
            method: 'post',
            url: 'http://playbook.ga/api/schedule/trainer/create',
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "dates": ['2018-05-12', '2018-05-13'],
                "start_time": '09:00:00',
                "end_time": '17:00:00',
                "price_per_hour": '7000',
                "currency": 'RUB'
            }
        }).then(response => {
            console.log(response);
        });
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.request}>
                    <button>Create trainer schedule</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;