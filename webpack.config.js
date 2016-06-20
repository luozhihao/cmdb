var webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/main.js'
        //vendors: ['react','jquery']
    },
    output: {
        path: './dist',
        publicPath: '/static/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader?limit=819200'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {   test: /\.css$/, 
                loader: 'style-loader!css-loader?sourceMap' 
            },
            { 
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity) // 这是第三方库打包生成的文件
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}