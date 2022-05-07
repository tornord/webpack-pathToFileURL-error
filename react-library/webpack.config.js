const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const filename = env.production ? "index-library" : "index-demo";
  return {
    mode: env.production ? "production" : "development",
    devtool: "inline-source-map",
    entry: {
      app: path.join(__dirname, "src", `${filename}.tsx`),
    },
    target: env.production ? "node" : "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(woff|woff2)$/,
          type: "asset/resource",
          generator: {
            filename: "./fonts/[name][ext]",
          },
        },
      ],
    },
    output: {
      clean: env.production ? true : false,
      filename: `${filename}.js`,
      path: path.resolve(__dirname, env.production ? "dist" : "demo"),
      ...(env.production ? { library: { type: "commonjs" } } : {}),
    },
    plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, "src", "index.html") })],
    devServer: {
      static: path.resolve(__dirname, "./demo"),
    },
  };
};
