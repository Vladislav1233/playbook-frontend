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
        //     "currency": "Currency: RUB, UAH, USD, etc. Default: RUB",
        //     "playground_id": "Playground id. Required if type = playground"
        //   }
        // /api/schedule/trainer/create
        let valueToken = localStorage.getItem('userToken');
        let valueRole = localStorage.getItem('userRole');
        console.log(valueToken);
        console.log(valueRole);

        axios({
            method: 'post',
            url: 'http://playbook.ga/api/register',
            data: {
                "first_name": "Владислав",
                "last_name": "Довженко",
                "phone": '79176297123',
                "is_trainer": '0'
              }
        }).then(response => {
            console.log(response);
        });
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.request}>
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;