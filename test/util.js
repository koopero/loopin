const path = require('path')
const util = exports

util.resolveData = path.resolve.bind( null, __dirname, 'data/' )

util.newLoopin = function ( opt ) {
  const Loopin = require('../node.js')
      , loopin = Loopin()

  // console.log( util.resolveData() )

  loopin.plugin('files')
  loopin.filesRoot( util.resolveData() )

  loopin.plugin('presetDir')

  loopin.plugin('preset')

  loopin.plugin('bootstrap', {
    builder: {
      verbose: true,
      cwd: util.resolveData()
    }
  })


  return loopin
}
