import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Home extends Component {

    constructor() {
        super();
        this.state = { benchmark:'' };
        // this.handleInputChange =this.handleInputChange.bind(this);
        // this.submitbenchmark =this.submitbenchmark.bind(this);
        }





       


render() {

return (
 <div>
 <hr/>
 <h1 className="text-center">Welcome to sikkay</h1>

 <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              Benchmark
            </Button>

 


 <hr/>
 </div>
 );
 }
 }

export default Home;