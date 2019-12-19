var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const base64url = require('base64url');

window.signHS = function(payload, secret){
	// var token = jwt.sign(payload, secret);
	var token = jwt.sign(payload, Buffer.from(secret, 'base64'));
	
	// var s = token.split('.')[2];

	return token;
}

window.decodeHS = function(token, secret){
	// var token = jwt.sign(payload, secret);
	// var token = jwt.sign(payload, Buffer.from(secret, 'base64'));
	var decoded = jwt.verify(token, Buffer.from(secret, 'base64'));
	// var s = token.split('.')[2];

	return decoded;
}

window.jwt = jwt;