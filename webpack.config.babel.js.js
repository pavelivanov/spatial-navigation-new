import webpack from 'webpack'


export default {
  entry: './src/index',

  output: {
    filename: './example/spatial-navigation.js',
    libraryTarget: 'umd',
    library: 'spatialNavigation',
  },
  
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     warnings: false,
    //     screw_ie8: true,
    //   },
    // }),
  ]
}
