module.exports = loopinShaderDir

const _ = require('lodash')

function loopinShaderDir() {
  const loopin = this

  loopin.plugin('shader')
  loopin.plugin('assetDir')

  loopin.shaderDir = shaderDir.bind( loopin )
}

shaderDir.options = require('boptions')({
  '#inline': ['dir'],
  'dir': 'shader',
  'scan': true,
  'watch': true
})

function shaderDir() {
  const loopin = this
  const opt = shaderDir.options( arguments )

  loopin.plugin('shader')
  loopin.plugin('files')
  loopin.plugin('assetDir')

  var assetDir = loopin.assetDir( opt, {
    extensions: loopin.shader.types,
    callback: file
  } )

  function file( path, key, type ) {
    path = loopin.filesAbsolute( path )
    const patch = {}
    patch[type] = path
    const shader = loopin.shader( key, patch )
  }
}
