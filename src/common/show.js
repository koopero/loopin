module.exports = show

const _ = require('lodash')

function show() {
  const loopin = this

  loopin.show = show

  function show( key ) {
    loopin.patch( key, 'show' )
  }

}
