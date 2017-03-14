var argv;
try {
argv = JSON.parse(process.env.npm_config_argv).original;
}	catch(ex) {
argv = process.argv;
}

let build_env = argv[2] ? argv[2] : 'test'

// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'
var path = require('path')
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('配置信息如下:', config);

var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

console.log('config.build.assetsPublicPath', config.build.assetsPublicPath);
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
