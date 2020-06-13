function OnlineUsers() {}

OnlineUsers.users = [];
OnlineUsers.prototype.push = function (id, data) {
  OnlineUsers.users[id] = data;
};

OnlineUsers.prototype.pop = function (id) {
  delete OnlineUsers.users[id];
};

OnlineUsers.prototype.get = function () {
  return OnlineUsers.users;
};

module.exports = OnlineUsers;
