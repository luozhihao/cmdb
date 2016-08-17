var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        main: __dirname + '/src/main.js'
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/static/dist/',
        filename: '[name]-[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader?limit=819200'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {   test: /\.css$/, 
                loader: 'style-loader!css-loader?sourceMap' 
            },
            { 
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            title: 'CMDB',
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
        })
    ]
}