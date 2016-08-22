module.exports = loopinClock

const _ = require('lodash')

function loopinClock() {
  const loopin = this

  var currentFrame = {
    delta: 0,
    index: NaN,
    speed: 0,
    time: 0
  }

  loopin.clockFrame = () => currentFrame
  loopin.clockTime = () => currentFrame.time


  loopin.listen( 'frame', onFrame )

  function onFrame( e ) {
    e = e.data
    currentFrame = e
    loopin.emit('frame', currentFrame )
    return true
  }

}
