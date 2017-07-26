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
}