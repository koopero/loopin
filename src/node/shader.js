module.exports = loopinShader

const _ = require('lodash')

function loopinShader() {
  const loopin = this

  loopin.shader = loopin._map( 'shader/', shader )
}

shader.options = require('boptions')({
  'vert': '#string',
  'frag': '#string',
  'geom': '#string'
})

shader.types = ['vert', 'frag', 'geom']

function shader( ) {
  const self = this
      , loopin = self.loopin

  //
  // Object setup
  //


  //
  // Apply arguments
  //
  const opt = shader.options( arguments )

  _.map( shader.types, function ( type ) {
    if ( opt[type] )
      setShader( type, opt[type])
  })

  function setShader( type, source ) {
    if ( isFileName( source ) ) {
      return loopin.fileLoadText( source )
        .then( ( src ) => self.patch( src, type+'/data' ) )
    } else {
      return self.patch( source, type+'/data' )
    }
  }

}

// -----------------
// Utility Functions
// -----------------

function isFileName( str ) {
  if ( str.length > 255 )
    return false

  if ( str.indexOf('\n') != -1 )
    return false

  return true
}
