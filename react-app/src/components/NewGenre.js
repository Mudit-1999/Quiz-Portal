import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './New.css';

class NewGenre extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre_name: "*",
      },
      submitted: false,
      alreadyexists: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:5004/genre/', {
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
          window.location.reload();
    }
  });
  }

  handleChange(event) {
    this.state.formData.genre_name = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Genre</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre Name </label>
                <input type="text" className="form-control" value={this.state.genre_name} onChange={this.handleChange} required />
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
  
        {this.state.submitted &&  
          <div>
            <h2>
              New genre successfully added. 
            </h2>
              <Redirect to='/ViewGenre' />
          </div>
        }
        
        {this.state.alreadyexists && !this.state.submitted &&   
          <div>
            <h2>
               Genre Already Exists. 
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default NewGenre;
