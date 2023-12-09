require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const { createProxyMiddleware } = require('http-proxy-middleware');
const { api } = require('./modules/api');
const stream = require('./modules/stream');
const playlists = require('./modules/playlists');
const history = require('./modules/history');
const { keys } = require('./modules/auth');

const app = express();

app.use(helmet({
	crossOriginResourcePolicy: false
}));
app.use(cors());
app.use(morgan('combined'));
app.use(require('express-rate-limit')({
	windowMs: 5 * 1000,
	max: 50,
	standardHeaders: true,
	legacyHeaders: false,
}));

app.get('/', (req, res) => {
	return res.sendStatus(200);
});

app.get('/track/:id', async (req, res) => {
	let data = await api.fetch_track(req.params.id);
	return res.send(data);
});

app.get('/youtube/:id', async (req, res) => {
	let data = await api.fetch_youtube(req.params.id);
	return res.send(data);
});

app.get('/key', async (req, res) => {
	let key = await keys.get(req.headers['authorization']);
	if (!key) return res.sendStatus(400);
	return res.send(key);
});

app.use('/stream/:key/:id', stream);
app.use('/playlists', playlists);
app.use('/history', history);

app.use('/', createProxyMiddleware({
	target: 'https://api.deezer.com', changeOrigin: true, onProxyRes: (proxyRes) => {
		delete proxyRes.headers['set-cookie'];
	}
}));

app.listen(3001 || process.env.PORT, () => { console.log(`Server Successfully Started on port ${3001 || process.env.PORT}`); });