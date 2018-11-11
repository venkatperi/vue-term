const path = require( 'path' )
const webpack = require( 'webpack' )
const { webpackHelper } = require( '@venkatperi/webpack-helper' )

const cwd = __dirname
const buildDir = 'dist'

const modules = {
  mode: true,
  vue: true,
  ts: true,
  miniExtractCss: true,
  optimizeCss: true,
  style: true,
  img: true,
  ext: true,
  devServer: true,
  misc: true,
  dev: true,
  copy: { args: [[{ from: 'index.html' }]] },
  prod: true,
}
const variants = [
  'umd',
]

module.exports = webpackHelper( variants, modules, cwd, buildDir, webpack, ( config ) => {
  config
    .entry( 'simple-example' )
    .add( './src/main.ts' )

  config.output
    .path( path.resolve( __dirname, './dist' ) )
    .publicPath( 'umd' )
} )


