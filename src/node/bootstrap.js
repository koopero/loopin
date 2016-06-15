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


      loopin.plugin( 'stdio', build.process )

      loopin.emit( 'open' )

      return loopin
    })
}
