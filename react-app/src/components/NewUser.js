import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom'
import './New.css';




class NewUser extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            f_name: "",
            l_name: "",
            email: "",
            pwd: "",
          },
          submitted: false,
          alreadyexists: false,
        }
        this.handleFChange = this.handleFChange.bind(this);
        this.handleLChange = this.handleLChange.bind(this);
        this.handleEChange = this.handleEChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit (event) {
        event.preventDefault();
        fetch('http://localhost:5004/signup/', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
       .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
        }
        else if(response.status==401)
        {
          this.setState({alreadyexists: true});
        }
        window.location.reload();
      });
      }

    handleFChange(event) {
        this.state.formData.f_name = event.target.value;
    }

    handleLChange(event) {
        this.state.formData.l_name = event.target.value;
    }

    handlePChange(event) {
        this.state.formData.pwd = event.target.value;
    }
    handleEChange(event) {
        this.state.formData.email = event.target.value;
    }


    render() {

        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Register</h1>
            </header>
            <br/><br/>
            <div className="formContainer">

             <form onSubmit={this.handleSubmit}>
            <div className="form-group">
               <label>First Name</label>
                <input type="text" className="form-control" value={this.state.f_name} onChange={this.handleFChange} required />
            </div>
            <div className="form-group">
                    <label>Last Name</label> 
                    <input type="text" className="form-control" value={this.state.l_name} onChange={this.handleLChange} required />
            </div>
            <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange} required/>
                </div> 
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.pwd} onChange={this.handlePChange} required />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&  
          <div>
            <h2>
              New genre successfully added.
              {/* <Redirect to='/signin' /> */}
            </h2>
          </div>
        }

        {this.state.alreadyexists &&  !this.state.submitted &&
          <div>
            <h2>
                Username Already Registered 
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default NewUser;
