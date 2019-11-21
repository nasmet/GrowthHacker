module.exports = {
	devServer: {
		historyApiFallback: true,
	},
	entry: 'src/index.jsx',
	publicPath: '/',
	plugins: [
		['ice-plugin-fusion', {
			themePackage: '@alifd/theme-ice-purple',
		}],
		['ice-plugin-moment-locales', {
			locales: ['zh-cn'],
		}]
	],
	externals: {
		'bizcharts': 'BizCharts',
	}
};