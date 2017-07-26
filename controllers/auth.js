const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
function createUserToken(user){
	let timestamp = new Date().getTime();
	return jwt.encode({sub: user.id,iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
	console.log(req.body);
	//get user data
	var email = req.body.email;
	var password = req.body.password;

	if(!email || !password){
			return res.status(401).send({error: 'Hey you need to put in a valid email or password.'})
		}
		console.log("it got here");
	//does a user exist already?
	User.findOne({email: email}, function(err, existingUser){
		if(err){
			return next(err);//handle search error
		}
		if(existingUser){
			return res.status(401).send(err);
		}
		//new user
		let user = new User({
			email: email,
			password: password
		});
		console.log("it got here");
		//save the record into the DB
		user.save(function(err){
			if(err){
				return next(err);
			}
			//if success:
			console.log("it got yay");
			res.json({token:createUserToken(user), user: user});
		});
	});
}

exports.signin = function(req, res, next){
	// user has alread had their email and pw auth'd, give them a token
	res.send({ token: createUserToken(req.user), user: req.user });
}