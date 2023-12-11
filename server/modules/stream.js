const os = require('os');
const dfi = require('d-fi-core');
const axios = require('axios');
const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const { api } = require('./api');
const { keys } = require('./auth');
const { unpad, pad } = require('./utils');
const { db } = require('./db');

const temp = `${os.tmpdir()}/InspareMusic`;

fs.mkdirSync(temp, { recursive: true });

const check_exists = async (id) => {
	let data = await api.fetch_track(id, true);
	if (data) return true;
	return false;
};

const file_exists = async (path) => {
	return fs.existsSync(path);
};

const youtube_search = async (id, path) => {
	try {
		let track = await api.fetch_track(id);
		if (!track) return false;

		let yt_id = await db.list('youtube_refs', 0, 1, {
			filter: `track = "${pad(id)}"`
		});

		if (yt_id) yt_id = yt_id?.items?.[0]?.youtube;

		if (!yt_id) {
			const ytmusic = await import('node-youtube-music');
			const music = await ytmusic.searchMusics(`${track?.artist?.name} ${track?.title}`);

			yt_id = music?.[0]?.youtubeId;
			if (!yt_id) return false;

			await db.set('youtube_refs', {
				track: pad(id),
				youtube: yt_id
			});
		}

		await youtube(yt_id, path).catch(() => {
			return false;
		});

		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};

const download = async (id, path) => {
	try {
		const track = await dfi.getTrackInfo(id);
		const track_data = await dfi.getTrackDownloadUrl(track, 3);
		const { data } = await axios.get(track_data.trackUrl, { responseType: 'arraybuffer' });
		const file = track_data.isEncrypted ? dfi.decryptDownload(data, track.SNG_ID) : data;
		fs.writeFileSync(path, file);
		return true;
	} catch (e) {
		console.log(e);
		console.log('Deezer playback failed, falling back to YouTube.');
		let yt = await youtube_search(id, path);
		if (yt) return true;
		return false;
	}
};

const youtube = (id, path) => {
	return new Promise(async (res, rej) => {
		try {
			const data = await ytdl(id, {
				quality: 'highest',
				filter: (format) => {
					if (format.mimeType.startsWith('audio/mp4')) {
						return true;
					}
				}
			});

			let write = fs.createWriteStream(path);

			data.pipe(write);

			data.on('end', () => {
				return res(true);
			});

			data.on('error', (e) => {
				return rej(false);
			});
		} catch (e) {
			console.log(e);
			return false;
		}
	});
};

const stream = async (req, res, next) => {
	let auth = await keys.get(req.params.key);
	if (!auth) return res.sendStatus(400);

	let id = req.params.id;

	if (id.endsWith('.mp3')) {
		id = id.replace('.mp3', '');
	} else {
		return res.sendStatus(404);
	}

	let request_cancelled = false;

	req.on('close', () => {
		request_cancelled = true;
	});

	let path = `${temp}/${id}.mp3`;
	let exists = await file_exists(path);

	if (request_cancelled) return;

	//file already on server
	if (exists) return res.sendFile(path);

	if (req.query.type && req.query.type === 'youtube') {
		let dl = await youtube(unpad(id), path).catch(() => {
			return res.sendStatus(500);
		});

		if (!dl) return res.sendStatus(500);

		return res.sendFile(path);
	}

	exists = await check_exists(id);
	//track does not exist
	if (!exists) return res.sendStatus(404);

	if (request_cancelled) return;

	//download
	let dl = await download(id, path);
	if (!dl) return res.sendStatus(500);

	return res.sendFile(path);
};

const init = async () => {
	await dfi.initDeezerApi(process.env.ARL);
	try {
		const user = await dfi.getUser();
		console.log(`Deezer logged in as ${user.BLOG_NAME}`);
	} catch (e) {
		console.error(e);
	}
};

init();

module.exports = stream;