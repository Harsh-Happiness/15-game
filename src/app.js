import React, { Component } from "react";
import update from "immutability-helper";
import "./app.scss";

const num = new Set([15]);
while (num.size < 16) {
  let x = Math.floor(Math.random() * 16);
  num.add(x);
}
// let numArr = [...num];

// console.log(num);
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      numArr: [...num]
    };

    this.handleBoxMove = this.handleBoxMove.bind(this);
  }

  handleBoxMove(item, index) {
    const { numArr } = this.state;

    if (
      numArr[index + 4] === 0 ||
      numArr[index - 4] === 0 ||
      numArr[index + 1] === 0 ||
      numArr[index - 1] === 0
    ) {
      let iZero = numArr.indexOf(0);
      this.setState({
        numArr: update(numArr, {
          [iZero]: { $set: item },
          [index]: { $set: 0 }
        })
      });
    }
  }
  render() {
    const { numArr } = this.state;

    return (
      <div className="main-container">
        <div className="body">
          {numArr.map((item, index) => (
            <div
              key={index}
              className={
                item === 0
                  ? "zero-container"
                  : item === index + 1
                  ? "one-box-container__match"
                  : "one-box-container"
              }
              onClick={() => this.handleBoxMove(item, index)}
            >
              <span className="number-text"> {item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
