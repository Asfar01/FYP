import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { useAsync } from "react-async";

var socket = socketIOClient("http://localhost:5252");

class LoggedIn extends Component {
  state = {
    task: null,
    sendTask: null,
    apiHit: null
  }

  constructor() {
    super();
    this.state = { benchmark: "", time: null };
    var socket_packet = {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("x-access-token"),
    };
    socket.emit("online", socket_packet);

    socket.on("new-task", (data) => {
      this.setState({
        task: data
      });
    });

    socket.on("complete-task-notification", async (data) => {
      this.setState({
        sendTask: { ...this.state.sendTask , status: data.message, result: data.result}
      });
      console.log("api hit hony sy pehly", this.state.apiHit)
      if(!this.state.apiHit){
      await axios
      .post("http://localhost:3001/transaction/broadcast", {
        amount: 25,
        sender: JSON.parse(localStorage.getItem("user")).user._id,
        recipient:'275278785dryetrh'
        
      }).then((response) => {
        console.log(response);
        this.setState({apiHit:true}, () => {
          console.log(this.state.apiHit)
        })

      })};
    });

    socket.on("running-task-notification", (data) => {
      console.log("running notification", data);
      this.setState({
        sendTask: { ...this.state.sendTask , status: data.message}
      });
    });

    // this.handleInputChange =this.handleInputChange.bind(this);
    // this.submitbenchmark =this.submitbenchmark.bind(this);
  }

  string_len =  async (m) => {
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

  find_grt_pn = (d) => {
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
  };

  test_prime = (n) => {
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
  };

  sendTask = () => {
    // console.log(JSON.parse(localStorage.getItem("user")).user._id);
    axios
      .post("http://localhost:4000/api/v1/task/uploadTask", {
        id: JSON.parse(localStorage.getItem("user")).user._id,
      })
      .then((res) => {
        let socket_packet = {
          key: res.data.nodeKey,
          body: {
            code: `The Task has Arrived`,
          },
        };
        this.setState({
          sendTask: {...socket_packet, status: "Uploaded" }
        });
        socket.emit("send-task", socket_packet);
      });
  };

  startTask = async (val) => {
    var socket_packet = {
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("x-access-token"),
    };
    socket.emit("running", { key: this.state.task.senderKey });
    socket.emit("busy", socket_packet);
    this.string_len(val).then(() => {
      socket.emit("complete", { key: this.state.task.senderKey ,result: this.state.time });
    });
  };

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
        {(this.state.sendTask) ?
          <div>
            <p><b>{this.state.sendTask.key}</b>:  {this.state.sendTask.status}</p>
            {(this.state.sendTask.result) ? 
              <p><b>Result:</b> {(this.state.sendTask.result/1000).toFixed(3)}</p>: <React.Fragment/>
            }
          </div>: <React.Fragment/> 
        }
        {(this.state.task) ? 
          <div>
            <p>{this.state.task.code}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {this.startTask(6)}}
            >
              Start Task
            </Button>
          </div>: <React.Fragment/>
        }
        {this.state.time && <div> {(this.state.time / 1000).toFixed(3)} </div>}

        <hr />
      </div>
    );
  }
}

export default LoggedIn;
