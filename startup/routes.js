const defualt = require("../routes/index");
const auth = require("../routes/auth");
const user = require("../routes/user");
const wallet = require("../routes/wallet");
const task = require("../routes/task");

module.exports = function (app) {
  app.use("/", defualt),
    app.use("/api/v1/auth", auth),
    app.use("/api/v1/user", user),
    app.use("/api/v1/wallet", wallet),
    app.use("/api/v1/task", task);
};
