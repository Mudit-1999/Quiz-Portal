import React, { Component } from 'react';
import './View.css';

class UserLeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      cur_email:"",
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    this.state.cur_email=JSON.parse(localStorage["auther"]).usr_email;
    const request = new Request('http://localhost:5004/userstat/'+ this.state.cur_email);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data}));
    }

  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Genre ID</th>
              <th>Quiz ID</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.usr_email}</td>
                      <td>{item.genre_id}</td>
                      <td>{item.qz_id}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default UserLeaderBoard;
