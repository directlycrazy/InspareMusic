const fetch = require('node-fetch');
const { db } = require('./db');
const { pad } = require('./utils');

let api = {};

api.fetch = async (path) => {
	try {
		const data = await fetch(`https://api.deezer.com${path}`);
		let text = await data.json();
		return text;
	} catch (e) {
		return { error: true };
	}
};

api.fetch_track = async (id, fast) => {
	if (!fast) {
		let data = await db.get('tracks', pad(id));
		if (data) return data?.data;
	}
	data = await api.fetch(`/track/${id}`);
	if (data.error || !data) return false;
	if (fast) return true;
	await db.set('tracks', {
		id: pad(data?.id),
		title: data?.title,
		artist: data?.artist?.name,
		album: data?.album?.title,
		data: data
	});
	return data;
};

module.exports = { api };