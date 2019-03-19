import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../store/constants/restAPI';

class TestRequest extends Component {
    request = (event) => {
        event.preventDefault();
        let valueToken = localStorage.getItem('userToken');
        let valueRole = localStorage.getItem('userRole');
        console.log(valueToken);
        console.log(valueRole);

        axios({
            method: 'post',
            url: `${API_URL}/api/playground/create`,
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "name": "Lawn Tennis",
                "description": "Playground description Lawn Tennis",
                "address": 'ул. Первомайская, д. 59, "Винновская роща"',
                "opening_time": "09:00:00",
                "closing_time": "23:20:00"
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
            url: `${API_URL}/api/organization/create`,
            headers: {
                'Authorization': `Bearer ${valueToken}`
            },
            data: {
                "name": "Lawn",
                "city_uuid": "1"
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