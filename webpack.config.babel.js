export const config = {
  mode: "development",
  entry: "./client",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        loader: "json-loader",
        test: /\.json$/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
