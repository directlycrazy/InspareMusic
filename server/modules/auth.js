const { db } = require('./db');

let keys = {};
let cached_users = {};

module.exports = async (req, res, next) => {
	let auth = req.headers['authorization'];
	if (!auth) return res.sendStatus(401);
	let cache = await keys.get(auth);
	if (!cache) return res.sendStatus(401);
	req.user = cached_users[auth];
	return next();
};

keys.get = async (key) => {
	if (cached_users[key]) return key;
	let val = await db.get('users', key);
	if (val) {
		cached_users[key] = val;
		return key;
	}
	return false;
};

module.exports.keys = keys;