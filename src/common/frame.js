module.exports = loopinFrame

const _ = require('lodash')

function loopinFrame() {
  const loopin = this

  var currentFrame = {
    delta: 0,
    index: NaN,
    speed: 0,
    time: 0
  }

  loopin.frame = () => currentFrame
  loopin.listen( 'frame', onFrame )

  function onFrame( e ) {
    currentFrame = e
    loopin.emit('frame', currentFrame )
    return true
  }

}
