const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      title: "Tsnake Game!"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
};