import React, { Component } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import task from './Components/task';

// import Regular from './components/regular';
// import Special from './components/special';
import Home from './Components/Home';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';






//////////////////material uii--------------------------


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';



const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: (2),
  },
  title: {
    flexGrow: 1,
  },
};


class App extends Component {

  logOut() {
    localStorage.removeItem('x-access-token');
  }

  render() {

    const classes = styles;
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
                  (isAuthenticated()) ?
                    (<li onClick={this.logOut}><a href="/">Log out</a> </li>) :
                    (<li><Link to="/login">Log in</Link></li>)
                }
              </ul>
            </div>




          </nav>

          {/* material iu */}



          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  News
          </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>











          <Box display="flex" justifyContent="center">
            <Box>
              <Route exact path="/" component={Home} />
            </Box>
            {/* <Route exact path="/tip/regular" component={Regular} />
        <Route exact path="/tip/Special" component={Special} /> */}
            <Box>
              <Route styles exact path="/login" component={Login} />
            </Box>
            <Box>
              <Route exact path="/signup" component={Signup} />
            </Box>
          </Box>
        </div>
      </Router>
    );
  }
}

export default App;