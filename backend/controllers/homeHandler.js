let apiRes = require("../helpers/response");
var Task = require("../models/tasks");
var Moment = require("moment");

class homeHandler {
  //Home Route
  index(req, res) {
    Task.find({}, function(err, data) {
      apiRes.successWithData(res, "Api Success", data);
    });
  }
  //Add Task Route
  addTask(req, res) {
    console.log(req.files);
    var priority = "dot " + req.body.priority;
    var task = new Task();
    task.task = req.body.task;
    task.priority = priority;
    task.date = Moment().format("DD/MM");
    task.time = Moment().format("HH:MM");
    const file = req.files.file;
    file.mv(`../frontend/public/images/${file.name}`, err => {
      if (err) {
        console.error(err);
      }
    });
    task.imageURL = `/images/${file.name}`;
    task.save(function(err, result) {
      if (err) {
        console.log(err);
        apiRes.error(res, "An error occured.");
      } else {
        Task.find({}, function(err, data) {
          apiRes.successWithData(res, "Api Success", data);
        });
      }
    });
  }
  //Delete Task Route
  deleteTask(req, res) {
    console.log(req.params);
    Task.findOneAndDelete({ _id: req.params.value }, function(err, data) {
      Task.find({}, function(err, data) {
        apiRes.successWithData(res, "Api Success", data);
      });
    });
  }
}

module.exports = homeHandler;
