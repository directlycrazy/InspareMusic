module.exports = {
	async rewrites() {
		return [
			{
				source: '/images/:path*',
				destination: 'https://e-cdns-images.dzcdn.net/images/:path*',
			},
		];
	}
};
