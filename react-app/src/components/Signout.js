import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './New.css'
class SignOut extends Component {
    constructor() {
        super();
        this.state = {
            auth : {
              log_in :false,
              usr_email : null,
              admin : false,
            },
          }
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit () {
        localStorage.setItem("auther",JSON.stringify(this.state.auth));
        window.location.reload()
    }
    
  render() {
    return(
        <div>
        {this.handleSubmit()} 
        <Redirect to="/"/>
        </div>
    )
  }
}

export default SignOut;