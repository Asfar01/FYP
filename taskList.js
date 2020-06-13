function TaskList() {}

TaskList.tasks = [];
TaskList.prototype.push = function (id, data) {
  TaskList.tasks[id] = data;
};

TaskList.prototype.pop = function (id) {
  delete TaskList.tasks[id];
};

TaskList.prototype.get = function () {
  return TaskList.tasks;
};

module.exports = TaskList;
