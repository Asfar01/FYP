import React, { Component } from 'react';
import axios from 'axios';


// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



//material UI styles

const styles = {
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    // avatar: {
    //   margin: theme.spacing(1),
    //   backgroundColor: theme.palette.secondary.main,
    // },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: (3),
    },
    submit: {
      margin: (3, 0, 2),
    },
  };




class Signup extends Component{

  //using material ui design
  



    constructor (props){
        super(props)
        this.state={

           

                firstname: '',
                lastname: '',
            
            
            phone:'',
            email:'',
            username:'',
            password:''
        }
        this.handleClick=this.handleClick.bind(this)
        this.send=this.send.bind(this)
    }
    handleClick(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    send(event){
       event.preventDefault();
       const signupdata={
        firstName:this.state.firstname,
        lastName:this.state.lastname,
        phone:this.state.phone,

        email:this.state.email,
        username:this.state.username,
        password:this.state.password
       }
       axios.post('http://localhost:4000/api/v1/auth/signup', signupdata )
        .then(response=>response.data)

    }

      






    render(){
        // const classes = useStyles();
        const   classes = styles;
        
    return (

        
        //   <div>    
        //     <form>
        //        <input type="text" placeholder="firstname" value={this.state.firstname} name="firstname" onChange={this.handleClick}/>
        //        <input type="text" placeholder="lastname" value={this.state.lastname} name="lastname" onChange={this.handleClick}/>           
        //        <input type="text" placeholder="phone" value={this.state.phone} name="phone" onChange={this.handleClick}/>
              
              
        //        <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleClick}/>
              
        //        <input type="text" placeholder="username" value={this.state.username} name="username" onChange={this.handleClick}/> 
        //        <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleClick}/> 
              
              
        //        <input onClick={this.send} type="submit"/>
        //     </form>
        //   </div>



           //-----------------material ui signup -------------------




           <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={classes.paper} >
       
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <br />
        <form  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="firstname"
                type="input"
                name="firstname"
                variant="outlined"
                 required
                fullWidth
                id="firstname"
                label="firstname"
                value={this.state.firstname}
                autoFocus
                onChange={this.handleClick}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               type="input"
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastname"
                autoComplete="lastname"
                value={this.state.lastname}

                onChange={this.handleClick}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               type="input"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleClick}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               type="input"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={this.state.phone}
                onChange={this.handleClick}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
               type="input"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                name="username"
                autoComplete="username"
                value={this.state.username}
                onChange={this.handleClick}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               type="input"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleClick}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.send}
            
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>




        )
     }
}


export default Signup;