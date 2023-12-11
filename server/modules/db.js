const pocketbase = require('pocketbase/cjs');

const pb = new pocketbase(process.env.PB_URL);

pb.autoCancellation(false);

const auth = pb.admins.authWithPassword(process.env.PB_EMAIL, process.env.PB_PASSWORD);

let db = {};

db.get = async (table, id, options) => {
	if (!pb.authStore.isValid) return false;
	try {
		let data = await pb.collection(table).getOne(id, options);
		return data;
	} catch (e) {
		return false;
	}
};

db.list = async (table, from, to, options) => {
	if (!pb.authStore.isValid) return false;
	try {
		let data = await pb.collection(table).getList(from, to, options);
		return data;
	} catch (e) {
		return false;
	}
};

db.set = async (table, data) => {
	if (!pb.authStore.isValid) return false;
	try {
		const record = await pb.collection(table).create(data);
		return record.id;
	} catch (e) {
		return false;
	}
};

db.update = async (table, id, data) => {
	if (!pb.authStore.isValid) return false;
	try {
		const record = await pb.collection(table).update(id, data);
		return record.id;
	} catch (e) {
		return false;
	}
};

module.exports = { db };