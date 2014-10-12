var Datastore    = require('nedb');
var db = {
      tasks: new Datastore({ filename: 'storage/tasks.db', autoload: true }
    )
};


exports.create = function(req, res){
    db.tasks.insert(req.body, function(err, task) {
      res.json(task);
    });
};

exports.read = function(req, res){
    db.tasks.findOne({ _id: req.params.id }, function (err, task) {
        res.json(task);
    });
};

exports.update = function(req, res){
    db.tasks.update({ _id: req.params.id }, {
        $set: {
            name: req.body.name
        }
    },function (err, task) {
        res.json(task + ' record has been updated');
    });
};

exports.delete = function(req, res){
    db.tasks.remove({ _id: req.params.id }, function (err, numDeleted) {
        //res.json(task);
        res.send(numDeleted + ' has been deleted');
    });
};

exports.list = function(req, res){
    db.tasks.find({},function(error, tasks){
        res.json(tasks);
    });
};
