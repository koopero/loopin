module.exports = loopinImageDir

function loopinImageDir() {
  const loopin = this

  loopin.plugin('image')
  loopin.plugin('assetDir')

  loopin.imageDir = imageDir.bind( loopin )
}

imageDir.options = require('boptions')({
  '#inline': ['dir'],
  'dir': 'image',
  'scan': true,
  'watch': false
})

function imageDir() {
  const loopin = this
  const opt = imageDir.options( arguments )

  loopin.log('imageDir', '', opt )

  var assetDir = loopin.assetDir( opt, {
    extensions: loopin.image.extensions,
    callback: file
  } )

  function file( path, key, type ) {
    const patch = { src: path }
    const image = loopin.image( key, patch )
  }
}
