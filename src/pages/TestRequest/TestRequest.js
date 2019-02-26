import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    request = (event) => {
        event.preventDefault();
        let valueToken = localStorage.getItem('userToken');
        let valueRole = localStorage.getItem('userRole');
        console.log(valueToken);
        console.log(valueRole);

        axios({
            method: 'post',
            url: 'http://207.154.236.8/api/playground/create',
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "name": "Ulgu",
                "description": "Playground description Ulgu",
                "address": "Отрадная, 12",
                "opening_time": "09:00:00",
                "closing_time": "23:20:00",
                "type_id": "1"
              }
        }).then(response => {
            console.log(response);
        });
    };

    requestS = (event) => {
        event.preventDefault();
        let valueToken = localStorage.getItem('userToken');
        // let valueRole = localStorage.getItem('userRole');

        axios({
            method: 'post',
            url: 'http://playbook.ga/api/organization/create',
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "name": "Lawn",
                "city_id": "1"
              }
        }).then(response => {
            console.log(response);
        });
    }
    
    render() {
        return(
            <div>
                <form onSubmit={this.request}>
                    <button>Create new playground</button>
                </form>

                <form onSubmit={this.requestS}>
                    <button>Create new organization</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;