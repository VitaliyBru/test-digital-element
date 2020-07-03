const path = require(`path`);
const webpack = require(`webpack`);

const isProd = process.env.NODE_ENV === `production`;

module.exports = {
  context: path.join(__dirname, `src`),

  entry: {
    app: [`./js/app.js`]
  },

  output: {
    filename: `[name].bundle.js`,
    publicPath: `/build/js`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // `babel-loader`
          {
            loader: `babel-loader`,
            options: {
              presets: [`@babel/preset-env`],
              babelrc: false
            }
          }
        ]
      }
    ]
  },

  mode: isProd ? `production` : `development`
};
