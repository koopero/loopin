module.exports = bootstrap
bootstrap.options = require('boptions')( {
  'builder': {
    '#default': {}
  }
})

const Promise = require('bluebird-extra')

const Loopin = require('../core/Loopin')

const builder = require('loopin-builder')



function bootstrap() {
  const opt = bootstrap.options( arguments )

  opt.builder.run = true

  return builder( opt.builder )
    .then( function ( build ) {
      const loopin = Loopin()

      loopin.pluginAdd( require('./log.js') )
      loopin.pluginAdd( require('./stdio.js'), build.process )
      loopin.pluginAdd( require('../plugin/common/preset') )
      loopin.pluginAdd( require('../plugin/node/presetDir') )

      return loopin
    })
}
