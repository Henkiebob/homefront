var HomeController = {

	getIndex: function(req, res) {
		res.render('home');
	},

	postIndex: function(req, res) {
		res.json(req.body);
	}

};

module.exports = HomeController;