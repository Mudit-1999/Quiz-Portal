import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './New.css';

class SigninUser extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            email: "",
            pwd: "",
          },
          submitted: false,
          auth: {
              usr_email: null,
              log_in: null,    
              admin: null,
              current_score: parseInt(0,10),
          },
        }
        this.handleEChange = this.handleEChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit (event) {
        console.log(this.state.formData)
        event.preventDefault();
        fetch('http://localhost:5004/signin/', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
       .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          this.state.auth.usr_email=this.state.formData.email;
          //console.log(this.state.formData.email);
          this.state.auth.log_in=true;
          if(this.state.formData.email=="agarwalmudit9876@gmail.com")
          {
            this.state.auth.admin=true;
          }
          else
          {
              this.state.auth.admin=false;
          }
          console.log(this.state.auth)
          localStorage.setItem("auther",JSON.stringify(this.state.auth));
          window.location.reload();
        } else if(response.status==401)
        {
          this.setState({alreadyexists: true});
          this.state.auth.usr_email=null
          this.state.auth.log_in=false;
          this.state.auth.admin=false;
          localStorage.setItem("auther",JSON.stringify(this.state.auth));
           window.location.reload();
        }
      });
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
              <h1 className="App-title">Sign in</h1>
            </header>
            <br/><br/>
            <div className="formContainer">
             <form onSubmit={this.handleSubmit}>
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
                Login Successful !!!!.
              <Redirect to='/' />
            </h2>
          </div>
        }

        {this.state.alreadyexists &&  !this.state.submitted &&
          <div>
            <h2>
                Invalid Credentials 
            </h2>
          </div>
        }
      </div>
    );
  }
}


export default SigninUser;
