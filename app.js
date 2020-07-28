const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
var _ = require("lodash");
var OnlineUsers = require("./onlineUser");
var BusyUsers = require("./busyUsers");
const { func } = require("@hapi/joi");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = { exposedHeaders: "x-auth-token" };
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./startup/db")();
require("./startup/routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

// Socket .io
let onlineUsers = new OnlineUsers();
let busyUsers = new BusyUsers();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const SOCKET_PORT = 5252;
io.sockets.on("connection", function (client) {
  client.on("online", function (data) {
    if (!!data.user) {
      onlineUsers.push(client.id, {
        ...data.user,
        clientId: client.id,
      });
      console.log("online users", onlineUsers.get());
    }
  });

  client.on("busy", function (data) {
    if (!!data.user) {
      busyUsers.push(client.id, {
        ...data.user,
        clientId: client.id,
      });
      console.log("Busy users", busyUsers.get());
    }
  });

  client.on("complete", function (data) {
    busyUsers.pop(client.id);
    try {
      io.sockets.connected[data.key].emit("complete-task-notification", {
        result: data.result,
        task_id: data.task_id,
        message: "Task completed",
        id: client.id,
        performedBy: data.performer,
      });
    } catch (e) {
      console.log(e.message);
    }

    console.log("Online Users", onlineUsers.get());
    console.log("Busy Users", busyUsers.get());
  });

  client.on("kill-task", function (data) {
    busyUsers.pop(client.id);
    try {
      io.sockets.connected[data.key].emit("reject-task-notification", {
        task_id: data.task_id,
        message: "Task Rejected",
        id: client.id,
        performedBy: data.performer,
      });
    } catch (e) {
      console.log(e.message);
    }
  });

  client.on("send-task", function (data) {
    try {
      io.sockets.connected[data.key].emit("new-task", {
        ...data.body,
        task_id: data.task_id,
        number: data.primeNumber,
        senderName: data.clientName,
        message: "New Task Arrived",
        senderKey: client.id,
        action: data.action,
      });
    } catch (e) {
      console.log(e.message);
    }
  });

  client.on("running", function (data) {
    try {
      console.log("running:", data);
      io.sockets.connected[data.key].emit("running-task-notification", {
        message: "Task Running",
        id: client.id,
      });
    } catch (e) {
      console.log(e.message);
    }
  });

  client.on("disconnect", function () {
    onlineUsers.pop(client.id);
    busyUsers.pop(client.id);
    console.log("disconnected");
  });
});

io.listen(SOCKET_PORT);
console.log("Socket Working on " + SOCKET_PORT);
module.exports.io = io;
module.exports.app = app;
