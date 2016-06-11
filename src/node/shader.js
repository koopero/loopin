module.exports = loopinShader

const _ = require('lodash')

function loopinShader() {
  const loopin = this

  loopin.shader = loopin._map( 'shader/', shader )
  loopin.shaderDir = shaderDir.bind( loopin )
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
    source = isFileName( source ) ?
      loopin.fileLoadText( source )
      : Promise.resolve( source )

    return source
      .then( function ( src ) {
        self.patch( src, type )
      })
  }

}

shaderDir.options = require('boptions')({
  '#inline': ['dir'],
  'dir': 'shader',
  'scan': true,
  'watch': false
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
    const patch = {}
    patch[type] = path
    const shader = loopin.shader( key, patch )
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
