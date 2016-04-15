module.exports = bootstrap
bootstrap.options = require('boptions')( {

})

const Promise = require('bluebird-extra')

const Loopin = require('../core/Loopin')

const builder = require('loopin-builder')



function bootstrap() {
  const opt = bootstrap.options( arguments )

  return builder( opt )
    .then( function ( process ) {
      const loopin = Loopin()

      loopin.pluginAdd( require('./log.js') )
      loopin.pluginAdd( require('./stdio.js'), process )
      loopin.pluginAdd( require('../plugin/common/preset') )
      loopin.pluginAdd( require('../plugin/node/presetDir') )

      return loopin
    })
}
