const { db } = require('./db');

module.exports = async (req, res, next) => {
	let user = await db.get('users', req.headers['authorization']);
	if (!user) return res.sendStatus(400);
	req.user = user;
	return next();
};

let keys = {};
let cached_users = [];

keys.get = async (key) => {
	if (cached_users.includes(key)) return key;
	let val = await db.get('users', key);
	if (val) {
		cached_users.push(key);
		return key;
	}
	return false;
};

module.exports.keys = keys;