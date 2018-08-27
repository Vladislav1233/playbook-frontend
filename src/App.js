import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import ScheduleItem from './components/ScheduleItem'

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <main className="b-main">
        <p className="App-intro">
          Я хочу получить текст {this.props.testText}
        </p>
        <ScheduleItem />
      </main>
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
