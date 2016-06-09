module.exports = bootstrap
bootstrap.options = require('boptions')( {
  'root': {
  },
  'builder': {
    '#default': {}
  }
})

const Promise = require('bluebird-extra')

const Loopin = require('../core/Loopin')

const builder = require('loopin-builder')



function bootstrap() {
  const opt = bootstrap.options( arguments )

  const loopin = this

  // console.log( 'bootstrap', opt )

  opt.builder.run = true

  return builder( opt.builder )
    .then( function ( build ) {


      loopin.plugin( 'log' )
      loopin.plugin( 'stdio', build.process )
      loopin.plugin( 'read' )
      loopin.plugin( 'show' )
      loopin.plugin( 'preset' )
      loopin.plugin( 'files' )
      loopin.plugin( 'presetDir' )
      loopin.plugin( 'save' )

      return loopin
    })
}
