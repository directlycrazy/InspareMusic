const pad = (id) => {
	return String(id).padStart(15, '0');
};

const unpad = (id) => {
	return String(id).replace(/^0+/, "");
};

module.exports = { pad, unpad };