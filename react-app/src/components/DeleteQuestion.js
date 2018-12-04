// import {Link,Redirect} from 'react-router-dom'
import React, { Component } from 'react';
import './Delete.css';

class DeleteQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
        data: [],
        to_delete:[],
        qz_id: params.match.params.q_id,
        genre_id: params.match.params.g_id,
    }

    this.check_button=this.check_button.bind(this);
    this.handle_delete=this.handle_delete.bind(this);
  }
  check_button(event) {
    var to_delete = this.state.to_delete
    if (event.target.checked)
      to_delete.push(event.target.id)
    else 
      to_delete.splice(to_delete.indexOf(event.target.id), 1)
    this.setState({to_delete:to_delete})
  }

  handle_delete(){
    this.state.to_delete.forEach(id=>{
      console.log(id)
      fetch('http://localhost:5004/question/'+ id,
      { 
        method : 'DELETE' 
      })
        .then(response => {
        window.location.reload();
        })
    })
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:5004/question/' + this.state.genre_id + '/' + this.state.qz_id);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data}));
    }
    
    render() {
        console.log(this.state.data)
        return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All Question</h1>
        </header>
        
        <div className="formContainer">
        <table className="table-hover">
          <thead>
            <tr>
              <th> </th>
              <th>ID</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                 <tr key = {key}> 
                      <td>
                        <input type="checkbox" id={item.id} onChange={this.check_button} />
                      </td>
                      <td> {item.id} </td>
                      <td> {item.ques} </td>
                      <td> {item.opt1} </td>
                      <td> {item.opt2} </td>
                      <td> {item.opt3} </td>
                      <td> {item.opt4} </td>
                      <td> {item.ans} </td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <br/><br/>
            <button onClick={this.handle_delete} className="btn btn-default"> Delete Question </button>
        </div>
      </div>
    );
  }
}

export default DeleteQuestion;
