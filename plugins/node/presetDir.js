module.exports = presetDir
presetDir.options = require('boptions')( {
  '#inline': 'dir',
  'dir': {

  }
})

function presetDir( loopin ) {
  const opt = presetDir.options( _.slice( arguments, 1 ) )

  console.log( 'presetDir', 'options' )
}
