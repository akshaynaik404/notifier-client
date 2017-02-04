var path = require('path');
var webpack = require('webpack');


var CommonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compressor: {
		warnings: false
	}
});

module.exports = {

	entry: {
		index: path.resolve(__dirname, 'src') + '/index/app/',
		org: path.resolve(__dirname, 'src') + '/org/',
		personal: path.resolve(__dirname, 'src') + '/personal/'
	},
	output: {
		path: path.resolve(__dirname, 'public_html'),
		filename: '[name].js',
		publicPath: '/public_html/'
	},
	resolve: {
		modulesDirectories: [
        'node_modules',
      ]
	},
	plugins: [
		UglifyJsPlugin,
		// CommonsPlugin
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src/index/'),
					path.resolve(__dirname, 'src/org/'),
					path.resolve(__dirname, 'src/personal/')
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
      },
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src/index/'),
					path.resolve(__dirname, 'src/org/'),
					path.resolve(__dirname, 'src/personal/')
				],
				loader: 'style-loader!css-loader!sass-loader'
      }
    ]
	}
};
