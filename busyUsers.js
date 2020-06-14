function BusyUsers() {}

BusyUsers.users = [];
BusyUsers.prototype.push = function (id, data) {
  BusyUsers.users[id] = data;
};

BusyUsers.prototype.pop = function (id) {
  delete BusyUsers.users[id];
};

BusyUsers.prototype.get = function () {
  return BusyUsers.users;
};

module.exports = BusyUsers;
