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
		filename: 'bundle.js',
		//publicPath: 'http://localhost:3000'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules\//,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
		}, {
			test: /\.html/,
			loader: 'html'
		}]
	},

	resolve: {
		//root: [],

		extensions: [
			'', '.js', '.html', '.css'
		],
		//moduleDirectories: [
		//	__dirname + '/app',
		//	'node_modules'
		//],

		alias: {
			'underscore': 'backbone/node_modules/underscore'
		}
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	devtool : 'source-map',

	devServer: {
		noInfo: false,
		hot: true,
		inline: true,
		port: 3000
	}
};