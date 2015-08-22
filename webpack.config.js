var webpack = require('webpack');

module.exports = {
	entry: {
		app: [
			'webpack/hot/dev-server',
			'./app/es6/main.js'
		]
	},

	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		loaders: [{
			exclude: /node_modules\//,
			loader: 'babel-loader'
		}]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	devServer: {
		noInfo: false,
		hot: true,
		inline: true,
		port: 3000
	}
};