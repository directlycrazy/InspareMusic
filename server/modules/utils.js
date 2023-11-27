const pad = (id) => {
	return String(id).padStart(15, '0');
};

module.exports = { pad };