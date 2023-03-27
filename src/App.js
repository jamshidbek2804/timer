import React, { Component } from 'react'
import './App.css';


export default class App extends Component {
  state = {
    second: 0,
    minute: 0,
    interval: "",
    intervals: [],
    disabled: false,
    intevalDisabled: true,
  };
  handleInput = (event) => {
    this.setState({ minute: event.target.value });
  };

  startCount = () => {
    let a = setInterval(() => {
      const { second, minute } = this.state;
      if (second === 0 && minute >= 1) {
        this.setState({
          minute: minute - 1,
          second: 59,
        });
      }
      if (second !== 0) {
        this.setState({
          second: second - 1,
        });
      }
      if (second === 0 && minute === 0) {
        this.setState({
          second: 0,
          minute: 0,
        });
      }
    }, 100);
    this.setState({
      interval: a,
      disabled: true,
      intervalDisabled: false,
    });
  };

  stopCount = () => {
    clearInterval(this.state.interval);
    this.setState({
      disabled: false,
    });
  };

  resetCount = () => {
    clearInterval(this.state.interval);
    this.setState({
      second: 0,
      minute: 0,
    });
  };

  saveInterval = () => {
    const { second, minute, intervals } = this.state;
    intervals.push(minute + " : " + second);
    this.setState({
		intervals,
		intervalDisabled: false
    });
  };

  render() {
    const { second, minute, intervals, disabled, intervalDisabled } =
      this.state;
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Taymer</h1>
                <div className="form">
                  <div className="minute-form">
                    <label htmlFor="minute">Daqiqani kiriting: </label>
                    <input
                      onChange={this.handleInput}
                      id="minute"
                      type="range"
                      min="1"
                      max="59"
                      step="1"
                    />
                  </div>
                  {/* <div className="second-form">
                    <label htmlFor="minute">Soniyani kiriting: </label>
                    <input id="second" type="text" />
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                <h2 className="text-center">
                  {minute} : {second}
                </h2>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-info m-2"
                  onClick={this.startCount}
                  disabled={disabled}
                >
                  start
                </button>
                <button className="btn btn-danger m-2" onClick={this.stopCount}>
                  stop
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={this.resetCount}
                >
                  reset
                </button>
                <button
                  className="btn btn-success m-2"
                  onClick={this.saveInterval}
                  disabled={intervalDisabled}
                >
                  interval
                </button>
                {intervals.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}