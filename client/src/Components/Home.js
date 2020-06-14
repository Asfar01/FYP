import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Home extends Component {
  constructor() {
    super();
    this.state = { benchmark: "", time: null };
    
    // this.handleInputChange =this.handleInputChange.bind(this);
    // this.submitbenchmark =this.submitbenchmark.bind(this);
  }

  string_len(m) {
    let len = "";
    for (m; m > 0; m--) {
      len = len.concat("9");
    }

    var n = parseInt(len);
    let strt = performance.now();
    this.find_grt_pn(n);
    let endt = performance.now();
    this.setState({
      time: endt - strt,
    });

    //console.log(exect);
  }

  find_grt_pn(d) {
    let gpn = 0;
    for (let i = d; i >= 0; i--) {
      setTimeout(() => {
        if (this.test_prime(i)) {
          if (i > gpn) {
            gpn = i;
          }
        }
      }, 200);
    }
  }

  test_prime(n) {
    if (n === 1) {
      return false;
    } else if (n === 2) {
      return true;
    } else {
      for (var x = 2; x < n; x++) {
        if (n % x === 0) {
          return false;
        }
      }
      return true;
    }
  }

  render() {
    return (
      <div>
        <hr />
        <h1 className="text-center">Welcome to Sikkay</h1>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.string_len(6)}
        >
          Benchmark
        </Button>
        {this.state.time && <div> {(this.state.time / 1000).toFixed(3)} </div>}

        <hr />
      </div>
    );
  }
}

export default Home;
