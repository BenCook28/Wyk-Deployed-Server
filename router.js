var Auth = require('./controllers/auth');
var User = require('./models/user');

var passportService = require('./services/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){

	app.get('/splash', function(req, res, next){
	});
	app.post('/api/signup', Auth.signup);
	app.post('/api/signin', requireSignin, Auth.signin);
	app.post('/api/add-opportunity', (req, res) => {
		User.update({email: req.body.email}, req.body, (err, updatedUser) => {
			if (err) {
				console.log('inside if', err);
				res.send(err);
			} else {
				console.log('inside else');
				res.send(updatedUser);
			}
		})
	});
}