import React, { Component } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import Regular from './components/regular';
// import Special from './components/special';
import Home from './Components/Home';
import {  BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';


class App extends Component {

  logOut(){
    localStorage.removeItem('x-access-token');
  }
  
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid container">
            <div className="navbar-header">
              <span className="navbar-brand"><Link to="/"> DevTip</Link></span>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Signup">Signup</Link>
              </li>
              {/* <li>
                <Link to="/tip/regular">Regular Tips</Link>
              </li> */}
              {/* <li>
                {
                 ( isAuthenticated() ) ? <Link to="/tip/special">Special Tips</Link>:  ''
                }
              </li> */}
            </ul>
            <ul className="nav navbar-nav navbar-right">
             {
               ( isAuthenticated() ) ? 
                ( <li onClick={this.logOut}><a href="/">Log out</a> </li>) : 
                ( <li><Link to="/login">Log in</Link></li> )
             }
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/tip/regular" component={Regular} />
        <Route exact path="/tip/Special" component={Special} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
      </Router>
    );
  }
}

export default App;