const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const manifest = require('./src/manifest');

let options = {
	// entry file - starting point for the app
	entry: {
    popup: './src/scripts/popup.js',
    options: './src/scripts/options.js',
    background: './src/scripts/background.js'
  },
	// where to dump the output of a production build
	output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/[name].js'
  },
	module: {
		rules: [
      {
				test: /\.jsx?/i,
        exclude: /node_modules/,
				loader: 'eslint-loader',
        options: {},
        enforce: 'pre'
			},
			{
				test: /\.jsx?/i,
        exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
            ['env', {
              'targets': {
                'chrome': 52
              }
            }]
          ],
					plugins: [
						['transform-react-jsx'],
					]
				}
			},
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
		]
	},
  plugins: [
    new WebpackCleanupPlugin(),
    new CopyWebpackPlugin([
      {from: './src/_locales', to: '_locales'},
      {from: './src/icons', to: 'icons'},
      {from: './src/manifest.json', flatten: true},
      {from: './src/*.html', flatten: true}
    ])
  ],
	// enable Source Maps
	devtool: 'source-map',
};

if(process.env.NODE_ENV === 'production') {
  options.plugins.push(
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ZipPlugin({
      path: '../dist',
      filename: `${manifest.name} ${manifest.version}.zip`,
      exclude: [/\.map$/]
    })
  );
}

console.log(`This is a ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} build with ${options.plugins.length} plugins`);

module.exports = options;
