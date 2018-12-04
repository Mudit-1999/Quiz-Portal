import React, { Component } from 'react';
// import {Link,Redirect} from 'react-router-dom'
import './View.css';

class UserViewQuestion extends Component {
  constructor(params) {
    super(params);
    this.state = {
          formData: {
            chk1:"0",
            chk2:"0",
            chk3:"0",
            chk4:"0",
          },
        data: [],
        usrinfo:[],
        over:false,
        statData: {
          usr_email: "",
          score: "",
          qz_id: params.match.params.q_id,
          genre_id: params.match.params.g_id,
        },
        index:parseInt("0",10),
        score:parseInt("0",10),
        alreadydone:false,
    }
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleO4Change = this.handleO4Change.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
    this.handleNext   = this.handleNext.bind(this);
    this.uncheck   = this.uncheck.bind(this);
  }
  
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:5004/question/' + this.state.statData.genre_id + '/' + this.state.statData.qz_id);
    fetch(request)
    .then(response => response.json())
      .then(data => this.setState({data: data}));

      // const srequest = new Request('http://localhost:5004/euser/' + this.state.current_usr );
      // fetch(srequest)
      // .then(response => response.json())
      //   .then(usrinfo => this.setState({usrinfo: usrinfo}))

        
    }


    handleSubmit (event) {
    event.preventDefault();
    var index =this.state.index;
    console.log(this.state.data[index]);
    
    if(this.state.data[index])
    {
      if(this.state.formData.chk1 == this.state.data[index].Opt1Chk && this.state.formData.chk2 == this.state.data[index].Opt2Chk &&
        this.state.formData.chk3 == this.state.data[index].Opt3Chk && this.state.formData.chk4 == this.state.data[index].Opt4Chk)
        {
          this.state.score=this.state.score+1;
      }
      else
      {
        console.log(this.state.formData.chk1 ) ;
        console.log(this.state.formData.chk2 ) ;
        console.log(this.state.formData.chk3 ) ;
        console.log(this.state.formData.chk4 ) ;
        console.log( this.state.data[index].Opt1Chk);
        console.log( this.state.data[index].Opt2Chk);
        console.log( this.state.data[index].Opt3Chk);
        console.log( this.state.data[index].Opt4Chk);
      }
    }

      this.state.formData.chk1= "0";
      this.state.formData.chk2= "0";
      this.state.formData.chk3= "0";
      this.state.formData.chk4= "0";
    this.uncheck();
    this.handleNext();
  }

uncheck()
{
 var uncheck=document.getElementsByTagName('input');
 for(var i=0;i<uncheck.length;i++)
 {
  if(uncheck[i].type=='checkbox')
  {
   uncheck[i].checked=false;
  }
 }
}

  handleNext()
  {
    var index =this.state.index;
    index=index+1;
    if( index < this.state.data.length)
      this.setState({index:index});
    else
    {
      this.state.index=index;
      this.state.statData.score=this.state.score;
      this.state.statData.usr_email=JSON.parse(localStorage["auther"]).usr_email;
    
      fetch('http://localhost:5004/userstat/', {
         method: 'POST',
         body: JSON.stringify(this.state.statData),
       })
       .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          }
        else if(response.status==401)
        {
          fetch('http://localhost:5004/userstat/' + this.state.statData.usr_email, {
            method: 'PUT',
            body: JSON.stringify(this.state.statData),
          })
          .then(response => {
          if(response.status >= 200 && response.status < 300)
               this.setState({submitted: true});

          });
        }
      });
      console.log(this.state.statData)
      this.setState({over:true});
  }
} 
  handleO1Change(event) {
    if (event.target.checked)
      this.state.formData.chk1="1";
    else 
      this.state.formData.chk1="0";
  }

  handleO2Change(event) {
    if (event.target.checked)
      this.state.formData.chk2="1";
    else 
      this.state.formData.chk2="0";
  }
  handleO3Change(event) {
    if (event.target.checked)
      this.state.formData.chk3="1";
    else 
      this.state.formData.chk3="0";
  }
  handleO4Change(event) {
    if (event.target.checked)
      this.state.formData.chk4="1";
    else 
      this.state.formData.chk4="0";
  }

    
    render() {

      // console.log(this.state.usrinfo)
        return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz</h1>
        </header>

  {this.state.index < this.state.data.length &&
    
    <div className="container">
    {this.state.data[this.state.index] != undefined  &&
    <div>
     <br/><br/><br/><br/><br/><br/>
      <h2> Q{this.state.index + 1}  {this.state.data[this.state.index].ques } </h2>
      <form onSubmit={this.handleSubmit} >
      <div className="form-check">
      <h2>
      <input type="checkbox" className="form-check-input" onChange={this.handleO1Change} />
      <label className="form-check-label" for="defaultCheck1">
      {this.state.data[this.state.index].opt1}
       </label>
      </h2>
      </div>
      <div className="form-check">
      <h2>
      <input type="checkbox" className="form-check-input" onChange={this.handleO2Change} />
      <label className="form-check-label" for="defaultCheck1">
        {this.state.data[this.state.index].opt2}
        </label>
      </h2>
      </div>
      <div className="form-check">
      <h2>
      <input type="checkbox" className="form-check-input" onChange={this.handleO3Change} />
      <label className="form-check-label" for="defaultCheck1">
      {this.state.data[this.state.index].opt3}
      </label>
      </h2>
      </div>
      <div className="form-check">
      <h2> 
      <input type="checkbox" className="form-check-input" onChange={this.handleO4Change} />
      <label className="form-check-label" for="defaultCheck1">
      {this.state.data[this.state.index].opt4}
      </label>
      </h2>
      </div>
      <br/><br/>
            <button type="submit" className="btn btn-default">Submit</button>
     </form>
     </div>
    }
    </div>
  }
  {this.state.over &&
  <div> 
    <br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/>
      <h1> Quiz Over</h1>
      <h1> Score {this.state.score}</h1>
      <h1> {this.state.statData.usr_email}</h1>
    </div>
  }
    </div>
    );
  }
}
export default UserViewQuestion;
