const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const JavaScriptObfuscator = require("webpack-obfuscator");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       test: /\.js(\?.*)?$/i,
  //     }),
  //   ],
  // },
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
    }),
    new BrotliPlugin({
      asset: "[path].br",
      threshold: 0,
      minRatio: 0.8,
    }),
    new JavaScriptObfuscator(
      {
        compact: true,

        controlFlowFlattening: false,

        deadCodeInjection: true,

        debugProtection: true,

        debugProtectionInterval: true,

        disableConsoleOutput: true,

        identifierNamesGenerator: "hexadecimal",

        log: false,

        renameGlobals: true,

        rotateStringArray: true,

        selfDefending: true,

        shuffleStringArray: true,

        splitStrings: false,

        stringArray: true,

        stringArrayEncoding: true,

        stringArrayThreshold: 0.75,

        unicodeEscapeSequence: false,
      },
      []
    ),
  ],
};
