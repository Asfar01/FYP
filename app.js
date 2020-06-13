const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
var _ = require("lodash");
var OnlineUsers = require("./onlineUser");
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

  client.on("send-task", function (data) {
    console.log(data);
    try {
      io.sockets.connected[data.key].emit("new-task", data.body);
    } catch (e) {
      console.log(e.message);
    }
  });

  client.on("disconnect", function () {
    onlineUsers.pop(client.id);
    console.log("disconnected");
  });
});

io.listen(SOCKET_PORT);
console.log("Socket Working on " + SOCKET_PORT);
module.exports.io = io;
module.exports.app = app;
