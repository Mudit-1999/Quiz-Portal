import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './View.css';

class ViewQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
        data: [],
        qz_id: params.match.params.q_id,
        genre_id: params.match.params.g_id,
    }
  }


  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:5004/question/' + this.state.genre_id + '/' + this.state.qz_id);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data}));
    }
    
    render() {
        console.log(this.state.data[1])
        return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All Question</h1>
        </header>
        
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                 <tr key = {key} > 
                      <td> {item.id} </td>
                      <td> {item.ques} </td>
                      <td> {item.opt1} </td>
                      <td> {item.opt2} </td>
                      <td> {item.opt3} </td>
                      <td> {item.opt4} </td>
                      {JSON.parse(localStorage["auther"]).admin  &&
                      <td>  
                        <Link to ={'/EditQuestion/'+item.id}>
                            <button type="submit"  className="btn btn-default">Edit Question</button>
                        </Link>
                      </td>
                    }
                  </tr>
                )
             })}
          </tbody>
       </table>
          <br/><br/>
        
          {JSON.parse(localStorage["auther"]).admin  &&
          
          <Link to ={'/addquestion/'+ this.state.genre_id +'/'+ this.state.qz_id}>
            <button type="submit"  className="btn btn-default">Add Question</button>
          </Link>
          }          


        {/* {this.state.data.map(function(item, key) {
          return (
            <div class="list-group">
              <Link to ={'/viewquiz/'+item.id} className="list-group-item">{item.genre_name}</Link>
            </div> 
        )
      })} */}

        {/* <ul className="list-style-type:square">
          {this.state.data.map(function(item, key) {
               return (
                  <li key = {key}>{item.quiz_name}, {item.genre_id}</li>
                )
          })} */}
        {/* </ul> */}
      </div>
    );
  }
}

export default ViewQuestion;
