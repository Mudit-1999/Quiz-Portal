import React, { Component } from 'react';
import './Delete.css';

class DeleteUser extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
        to_delete:[],
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
        fetch('http://localhost:5004/user/'+id,
        { 
          method : 'DELETE' 
        })
          .then(response => {
          window.location.reload();
          })
      })
    }
  
    componentDidMount() {
      const request = new Request('http://localhost:5004/user/')
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}))
    }
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete Genre</h1>
          </header>
          <div className="formContainer">
            <table className="table-hover">
              <thead>
              <tr>
               <th></th>   
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                   return (
                      <tr key = {key}>
                          <td>
                            <input type="checkbox" id={item.id} onChange={this.check_button} />
                          </td>
                          <td>{item.id}</td>
                      <td>{item.f_name}</td>
                      <td>{item.l_name}</td>
                      <td>{item.email}</td>
                      <td>{item.pwd}</td>
                      </tr>
                    )
                 })}
              </tbody>
            </table>
            <br/><br/>
            <button onClick={this.handle_delete} className="btn btn-default"> Delete </button>
         </div>
        </div>
      );
    }
}

export default DeleteUser;