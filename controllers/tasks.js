var Datastore    = require('nedb');
var db = {
      tasks: new Datastore({ filename: 'storage/tasks.db', autoload: true }
    )
};

exports.list = function(req, res){
    db.tasks.find({},function(error, tasks){
        res.json(tasks);
    });
};

exports.view = function(req, res){
    db.tasks.findOne({ _id: req.params.id }, function (err, task) {
        res.json(task);
    });
};

exports.edit = function(req, res){
    db.tasks.insert(req.body, function(err, task) {
      res.json(task);
    });
};

exports.update = function(req, res){
    db.tasks.update({ _id: req.params.id }, { $set: { name: req.body.name } }, function (err, numReplaced) {
        res.send(numReplaced + 'aangepast');
    });
};


