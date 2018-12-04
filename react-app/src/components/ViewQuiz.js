import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './View.css';

class ViewQuiz extends Component {
  constructor(params) {
    super(params);
    this.state = {
        data: [],
        qcontainer:[],
        genre_id: parseInt(params.match.params.id,10),
    }
  }

  

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:5004/quiz/' + this.state.genre_id);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data}));

    // const quesreq = new Request('http://localhost:5004/quiz/' + this.state.genre_id);
    //   fetch(quesreq)
    //   .then(response => response.json())
    //     .then(data => this.setState({qcontainer: data}));
    }
    
    render() {
        console.log(this.state.data)
        return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All Quizzes</h1>
        </header>
        
        <table className="table-hover">
          <thead>
            <tr>
            {JSON.parse(localStorage["auther"]).admin  &&

              <th>ID</th>
        }
              <th>Quiz Name</th>
              <th> Play Quiz</th>
              {JSON.parse(localStorage["auther"]).admin  &&
                <th>Delete Quiz</th>
              }
                                  
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                 <tr key = {key} >
                    {JSON.parse(localStorage["auther"]).admin  &&

                      <td> {item.id} </td>
                    }
                    {JSON.parse(localStorage["auther"]).admin  &&

                      <td> 
                        <Link to ={'/viewquestion/'+ item.genre_id +'/'+ item.id}>
                            {item.qz_name}  
                        </Link>
                      </td>
                    }
                    {!JSON.parse(localStorage["auther"]).admin  &&
                    <td> 
                            {item.qz_name}  
                      </td>
                    }

                      <td>  
                        <Link to ={'/UserViewQuestion/'+ item.genre_id +'/'+ item.id}>
                            <button type="submit"  className="btn btn-default">Play Quiz</button>
                        </Link>
                      </td>
                    {JSON.parse(localStorage["auther"]).admin  &&
                      <td>  
                        <Link to ={'/DeleteQuestion/'+ item.genre_id +'/'+ item.id}>
                            <button type="submit"  className="btn btn-default">Delete Question</button>
                        </Link>
                      </td>
                    }
                  </tr>
                )
             })}
          </tbody>
       </table>
          <br/><br/>

      {JSON.parse(localStorage["auther"]).admin &&
          <Link to ={'/addquiz/'+ this.state.genre_id}>
            <button type="submit"  className="btn btn-default">Add Quiz</button>
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

export default ViewQuiz;
