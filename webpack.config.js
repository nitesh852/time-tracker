// const path = require('path');

// module.exports = {
//     target: 'public/main.js'
//   }


const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // The output directory for bundled files
    filename: 'bundle.js', // The name of the bundled JavaScript file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Use the loader for all JavaScript files
        exclude: /node_modules/, // Exclude node_modules from processing
        use: 'babel-loader', // Use the Babel loader to transpile JavaScript
      },
      {
        test: /\.css$/, // Use the loader for all CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Use the loader for image files
        type: 'asset/resource', // Use asset/resource to copy images to the output directory
      },
      {
        // for files that should be compiled for electron main process
        target: 'public/main.js'
    }
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // Serve files from the dist directory
    port: 3000, // The development server port
  },
};
