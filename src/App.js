import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Я хочу получить текст {this.props.testText}
        </p>
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    testText: store.toggleSchedule.testText
  }
}

export default connect(mapStateToProps)(App)
