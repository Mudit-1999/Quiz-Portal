import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './New.css';

class NewQuiz extends Component {
  constructor(params) {
    super(params);
    this.state = {
      formData: {
        qz_name: "",
        genre_id: params.match.params.id,
      },
      submitted: false,
      alreadyexists: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (event) {
      console.log(this.state.formData)
    event.preventDefault();
    fetch('http://localhost:5004/quiz/' + this.state.formData.genre_id , {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response => {
    if(response.status >= 200 && response.status < 300)
    {
      this.setState({submitted: true});
    }
    else
    {
          this.setState({alreadyexists: true});
    }
  });
  }

  handleChange(event) {
    this.state.formData.qz_name = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Quiz Name </label>
                <input type="text" className="form-control" value={this.state.qz_name} onChange={this.handleChange} required />
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
  
        {this.state.submitted &&  
          <div>
            <h2>
              New Quiz successfully added. 
            </h2>
              <Redirect to={'/viewquiz/' + this.state.formData.genre_id }/>
          </div>
        }
        
        {this.state.alreadyexists && !this.state.submitted &&   
          <div>
            <h2>
               Quiz Already Exists. 
            </h2>
          </div>
        }
      </div>
    );
  }
}
export default NewQuiz;
