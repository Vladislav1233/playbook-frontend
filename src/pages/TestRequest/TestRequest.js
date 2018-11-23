import React, { Component } from 'react';
import axios from 'axios';

class TestRequest extends Component {
    request = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://207.154.236.8/api/login',
            data: {
                "phone": "79176297124",
                "password": "lupeme"
              }
        });
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.request}>
                    <button>Авторизация</button>
                </form>
            </div>
        )
    }
}

export default TestRequest;