const express = require('express');
const { db } = require('./db');
const { api } = require('./api');
const { pad } = require('./utils');
const auth = require('./auth');

const router = express.Router();

router.use(auth);

router.get('/get', async (req, res) => {
	let data = await db.list('history', 0, 10, {
		filter: `user = "${req.user.id}"`,
		sort: '-created',
		expand: "track"
	});
	if (!data.items) return res.sendStatus(500);
	return res.send(data);
});

router.get('/add/:id', async (req, res) => {
	let track = await api.fetch_track(req.params.id);
	if (!track) return;
	let create = await db.set('history', {
		user: req.user.id,
		track: pad(track.id)
	});
	return res.send(create);
});

module.exports = router;