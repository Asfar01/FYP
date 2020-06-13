import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import socketIOClient from "socket.io-client";
import axios from "axios";

var socket = socketIOClient("http://localhost:5252");

class LoggedIn extends Component {
  constructor() {
    super();
    this.state = { benchmark: "", time: null };
    var socket_packet = {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("x-access-token"),
    };
    socket.emit("online", socket_packet);

    socket.on("new-task", function (data) {
      eval(data.code);
    });

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

  sendTask() {
    // console.log(JSON.parse(localStorage.getItem("user")).user._id);
    axios
      .post("http://192.168.100.6:4000/api/v1/task/uploadTask", {
        id: JSON.parse(localStorage.getItem("user")).user._id,
      })
      .then((res) => {
        let socket_packet = {
          key: res.data.nodeKey,
          body: {
            code: `console.log("The Task has Arrived")`,
          },
        };
        socket.emit("send-task", socket_packet);
      });
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
          onClick={() => this.string_len(5)}
        >
          Benchmark
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.sendTask()}
        >
          Send Task
        </Button>
        {this.state.time && <div> {(this.state.time / 1000).toFixed(3)} </div>}

        <hr />
      </div>
    );
  }
}

export default LoggedIn;
