module.exports = loopinImage

function loopinImage() {
  const loopin = this

  loopin.image = loopin._map( 'image/', image )
}

image.extensions = ['png','jpg']

image.options = require('boptions')({
  '#inline': ['src'],
  'buffer': '',
  'replace': false,
  'src': '#string',
  'crop': '#extend',
  'box': '#extend'
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
  loopin.log('image', self.path, opt )
  if ( opt.src ) {
    self.patch( opt )
  }

  return loopin.dispatchListen( self.path )
    .then( ( event ) => {
      if ( event.type == 'done' )
        return event.data

      throw new Error('Error loading image')
    } )
}
