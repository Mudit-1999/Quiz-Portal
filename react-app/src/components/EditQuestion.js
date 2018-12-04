import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './Edit.css';



class EditQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
      formData: {
        opt1chk: null,
        opt2chk: null,
        opt3chk: null,
        opt4chk: null, 
        qz_id:"",
        genre_id:"",
        ques:"",
        opt1:"",
        opt2:"",
        opt3:"",
        opt4:"",
      },
      data: [],
      ques_id: params.match.params.id,
      submitted: false,
      alreadyexists: false,
    }
    this.handleQChange  = this.handleQChange.bind(this);
    this.handle1Change  = this.handle1Change.bind(this);
    this.handle2Change  = this.handle2Change.bind(this);
    this.handle3Change  = this.handle3Change.bind(this);
    this.handle4Change  = this.handle4Change.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleO4Change = this.handleO4Change.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://localhost:5004/question/' + this.state.ques_id);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data,formData:data}));
    }
    
    
    handleSubmit (event) {
      console.log(this.state.formData)
      event.preventDefault();
      fetch('http://localhost:5004/question/' + this.state.ques_id , {
        method: 'PUT',
        body: JSON.stringify(this.state.formData),
      })
      .then(response => {
  if(response.status >= 200 && response.status < 300)
  {
    this.setState({submitted: true});
  }
  else(response.status==401)
  {
        this.setState({alreadyexists: true});
        // window.location.reload();
  }
});
}

handleQChange(event) {
  this.state.formData.ques = event.target.value;
}
handle1Change(event) {
  this.state.formData.opt1 = event.target.value;
}
handle2Change(event) {
  this.state.formData.opt2 = event.target.value;
}
handle3Change(event) {
  this.state.formData.opt3 = event.target.value;
}
handle4Change(event) {
  this.state.formData.opt4 = event.target.value;
}
handleO1Change(event) {
  if (event.target.checked)
    this.state.formData.opt1chk="1";
  else 
    this.state.formData.opt1chk="0";
}

handleO2Change(event) {
  if (event.target.checked)
    this.state.formData.opt2chk="1";
  else 
    this.state.formData.opt2chk="0";
}
handleO3Change(event) {
  if (event.target.checked)
    this.state.formData.opt3chk="1";
  else 
    this.state.formData.opt3chk="0";
}
handleO4Change(event) {
  if (event.target.checked)
    this.state.formData.opt4chk="1";
  else 
    this.state.formData.opt4chk="0";
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{'Edit Question' }</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.ques} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <input type="checkbox" className="btn" onChange={this.handleO1Change} />
                <label>  &nbsp;&nbsp; Option 1</label>
                <input type="text" className="form-control" value={this.state.opt1} onChange={this.handle1Change} />
            </div>
            <div className="form-group">
                <input type="checkbox" className="btn" onChange={this.handleO2Change} />
                <label>&nbsp;&nbsp;Option 2</label>
                <input type="text" className="form-control" value={this.state.opt2} onChange={this.handle2Change} />
            </div>
            <div className="form-group">
                <input type="checkbox" className="btn" onChange={this.handleO3Change} />
                <label>&nbsp;&nbsp;Option 3</label>
                <input type="text" className="form-control" value={this.state.opt3} onChange={this.handle3Change} />
            </div>
            <div className="form-group">
            <input type="checkbox" className="btn" onChange={this.handleO4Change} />
                <label>&nbsp;&nbsp;Option 4</label>
                <input type="text" className="form-control" value={this.state.opt4} onChange={this.handle4Change}  />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
  
        {this.state.submitted &&  
          <div>
            <h2>
               Question editted successfully. 
            </h2>
            <Redirect to={'/ViewQuestion/' + this.state.formData.genre_id  + '/' + this.state.formData.qz_id}/>
          </div>
        }
        
        {this.state.alreadyexists && !this.state.submitted &&   
          <div>
            <h2>
               Error. 
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default EditQuestion;
