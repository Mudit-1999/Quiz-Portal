import React, { Component } from 'react';
import NewGenre from './NewGenre';
import ViewGenre from './ViewGenre';
import DeleteGenre from './DeleteGenre';

import Home from './Home';

import AddQuiz from './AddQuiz';
import ViewQuiz from './ViewQuiz';
import DeleteQuiz from './DeleteQuiz';

import NewUser from './NewUser';
import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser';

import NewQuestion from './AddQuestions';
import ViewQuestion from './ViewQuestion';
import UserViewQuestion from './Userviewquestion';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';

import SigninUser from './Signin';
import SignOut from './Signout';
import UserLeaderBoard from './UserSpecificStat';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                      <li><Link to={'/'}>Home</Link></li>
                </ul>
                  

            {JSON.parse(localStorage["auther"]).admin  &&
              <ul className="nav navbar-nav">
              <li><Link to={'/ViewUsers'}>View Users</Link></li>
              <li><Link to={'/DeleteUser'}>Delete Users</Link></li>
              <li><Link to={'/NewGenre'}>Create Genre</Link></li>
              <li><Link to={'/DeleteGenre'}>Delete Genre</Link></li>
              </ul>
            }

            {JSON.parse(localStorage["auther"]).log_in  &&
                    <ul className="nav navbar-nav">
                      <li><Link to={'/ViewGenre'}>View Genre</Link></li>
                      <li><Link to={'/Mystat/:id'}>My Stat</Link></li>
                      <li><Link to={'/SignOut'}>Sign Out</Link></li>
                    </ul>
                  }

                  {!JSON.parse(localStorage["auther"]).log_in  &&
                    <ul className="nav navbar-nav">
                    <li><Link to={'/Register'}>Register</Link></li>
                    <li><Link to={'/Signin'}>Sign in</Link></li>
                    </ul>
                  }

              </div>
            </nav>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
            {JSON.parse(localStorage["auther"]).log_in  &&
            <Switch>
                  <Route exact path='/Mystat/:id' component={UserLeaderBoard} />
                  <Route exact path='/UserViewQuestion/:g_id/:q_id' component={UserViewQuestion} />
                 <Route exact path='/ViewGenre' component={ViewGenre} />
                 <Route exact path='/AddQuiz/:id' component={AddQuiz} />
                 <Route exact path='/ViewQuiz/:id' component={ViewQuiz} />
                 <Route exact path='/SignOut' component={SignOut} />
                 <Route exact path='/ViewQuestion/:g_id/:q_id' component={ViewQuestion} />
              </Switch>
            }
            
            {JSON.parse(localStorage["auther"]).admin  &&
            <Switch>
                 <Route exact path='/ViewUsers' component={ViewUser} />
                 <Route exact path='/DeleteUser' component={DeleteUser} />
                 <Route exact path='/NewGenre' component={NewGenre} />
                 <Route exact path='/DeleteGenre' component={DeleteGenre} />
                  <Route exact path='/DeleteQuiz/:id' component={DeleteQuiz} />
                  <Route exact path='/DeleteQuestion/:g_id/:q_id' component={DeleteQuestion} />
                  <Route exact path='/AddQuestion/:g_id/:q_id' component={NewQuestion} />
                  <Route exact path='/EditQuestion/:id' component={EditQuestion} />
            </Switch>
            }
             {!JSON.parse(localStorage["auther"]).log_in  &&
              <Switch>
                 <Route exact path='/Register' component={NewUser} />
                 <Route exact path='/Signin' component={SigninUser} />
            </Switch>
             }
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
