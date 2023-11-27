const express = require('express');
const { db } = require('./db');
const { api } = require('./api');
const { pad } = require('./utils');

const router = express.Router();

router.use(async (req, res, next) => {
	let user = await db.get('users', req.headers['authorization']);
	if (!user) return res.sendStatus(400);
	req.user = user;
	return next();
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
	let track = await api.fetch_track(req.params.track);
	data.tracks.push(pad(track.id));
	let update = await db.update('playlists', req.params.id, data);
	if (!data) return res.sendStatus(404);
	return res.send(data);
});

router.get('/tracks/:id', async (req, res) => {
	let data = await db.get('playlists', req.params.id, { expand: "tracks" });
	if (!data) return res.sendStatus(404);
	return res.send(data);
});

module.exports = router;