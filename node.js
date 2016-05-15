const _ = require('lodash')

const Loopin = require('./src/core/loopin')

Loopin.plugins = {}

_.extend( Loopin.plugins, require('./src/common/index') )
_.extend( Loopin.plugins, require('./src/node/index') )

Loopin.bootstrap = require('./src/node/bootstrap' )

module.exports = Loopin
