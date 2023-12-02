const os = require('os');
const dfi = require('d-fi-core');
const axios = require('axios');
const fs = require('fs');
const { api } = require('./api');
const { keys } = require('./auth');

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
		return false;
	}
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

	if (isNaN(id)) return false;
	let request_cancelled = false;

	req.on('close', () => {
		request_cancelled = true;
	});

	let path = `${temp}/${id}.mp3`;
	let exists = await file_exists(path);

	if (request_cancelled) return;

	//file already on server
	if (exists) return res.sendFile(path);

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