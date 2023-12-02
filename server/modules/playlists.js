const express = require('express');
const { db } = require('./db');
const { api } = require('./api');
const { pad } = require('./utils');
const auth = require('./auth');

const router = express.Router();

router.use(auth);

router.get('/list', async (req, res) => {
	let data = await db.list('playlists', 0, 50, {
		filter: `user = "${req.user.id}"`,
		sort: '-created'
	});
	let items = data?.items;

	if (!items) return res.sendStatus(500);

	let arr = [];

	for (let i = 0; i < items.length; i++) {
		const t = new Promise(async (res, rej) => {
			let playlist = items[i];
			let tracks = await db.list('playlist_tracks', 0, 4, {
				filter: `playlist = "${playlist.id}" && user = "${req.user.id}"`,
				sort: 'created',
				expand: "track"
			});
			arr.push({
				playlist: playlist,
				tracks: tracks?.items
			});
			return res();
		});
		await Promise.all([t]);
	}

	return res.send(arr);
});

router.get('/create/:name', async (req, res) => {
	let data = await db.set('playlists', {
		name: req.params.name,
		user: req?.user?.id
	});
	return res.send(data);
});

router.get('/get/:id', async (req, res) => {
	let data = await db.get('playlists', req.params.id);
	if (!data) return res.sendStatus(404);
	return res.send(data);
});

router.get('/add/:id/:track', async (req, res) => {
	let data = await db.get('playlists', req.params.id);
	if (!data) return res.sendStatus(404);
	let track = await api.fetch_track(req.params.track);
	let update = await db.set('playlist_tracks', {
		playlist: req.params.id,
		track: pad(track.id),
		user: req.user.id
	});
	return res.send(data);
});

router.get('/tracks/:id', async (req, res) => {
	let playlist = await db.get('playlists', req.params.id);
	let data = await db.list('playlist_tracks', 0, 10000, {
		filter: `playlist = "${playlist.id}" && user = "${req.user.id}"`,
		expand: "track"
	});
	if (!data) return res.sendStatus(404);
	return res.send(data);
});

module.exports = router;