import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Quiz App</h1>
        </header>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="container">
          <h1>Test Your Knowledge Here</h1>
        </div>

      </div>
    );
  }
}

export default Home;
