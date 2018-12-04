import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './View.css';

class ViewGenre extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:5004/genre/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All Genres</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
            {JSON.parse(localStorage["auther"]).admin  &&

              <th>ID</th>
    }
              <th>Genre Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                 <tr key = {key} > 
            {JSON.parse(localStorage["auther"]).admin  &&

                      <td> {item.id} </td>
               }
                      <td> 
                        <Link to ={'/ViewQuiz/'+ item.id}>
                            {item.genre_name}  
                        </Link>
                      </td>
                    {JSON.parse(localStorage["auther"]).admin  &&
                      
                      <td>  
                        <Link to ={'/DeleteQuiz/'+ item.id}>
                            <button type="submit"  className="btn btn-default">Delete Quiz</button>
                        </Link>
                      </td>
                    }
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewGenre;
