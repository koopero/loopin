module.exports = loopinImage

function loopinImage() {
  const loopin = this

  loopin.image = loopin._map( 'image/', image )
  loopin.imageDir = imageDir.bind( loopin )
}

image.extensions = ['png','jpg']

image.options = require('boptions')({
  '#inline': ['src'],
  'src': '#string',
})


function image() {
  const self = this
      , loopin = self.loopin

  //
  // Object Setup
  //

  //
  // Apply arguments
  //
  const opt = image.options( arguments )

  if ( opt.src ) {
    self.patch( { src: opt.src } )
  }
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

  loopin.plugin('assetDir')

  var assetDir = loopin.assetDir( opt, {
    extensions: image.extensions,
    callback: file
  } )

  function file( path, key, type ) {
    const patch = { src: path }
    const image = loopin.image( key, patch )
  }
}
