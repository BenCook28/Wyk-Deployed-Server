const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String,
	opportunity: Array
});

userSchema.pre('save', function(next){
	let user = this;

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	//this.password is our hashed and salted password

	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		//if there was an error, return the callback with the error
		if (err) { return callback(err); }
		//otherwise call the callback
		callback(null, isMatch);
	});
}

let model = mongoose.model('user', userSchema);

module.exports = model;