module.exports = loopinClock

const _ = require('lodash')

function loopinClock() {
  const loopin = this
      , dispatcher = new loopin.EventEmitter

  loopin.plugin('dispatch')

  var currentFrame = {
    delta: 0,
    index: 0,
    speed: 0,
    time: 0
  }

  loopin.clock = dispatcher

  loopin.clockFrame = () => currentFrame

  loopin.clockDelta = () => currentFrame.delta

  loopin.clockIndex = function clockIndex( index ) {
    index = parseInt( index )
    if ( !isNaN( index ) && index >= 0 ) {
      loopin.patch( index, 'clock/index/')
      currentFrame.index = index
    }

    return currentFrame.index
  }

  loopin.clockTime = function clockTime( index ) {
    index = parseFloat( index )
    if ( !isNaN( index ) ) {
      loopin.patch( index, 'clock/index/' )
      currentFrame.index = index
    }

    return currentFrame.time
  }

  loopin.clockSpeed = function clockSpeed( speed ) {
    speed = parseFloat( speed )
    if ( !isNaN( speed ) ) {
      loopin.patch( speed, 'clock/speed/' )
      currentFrame.speed = speed
    }

    return currentFrame.speed
  }

  loopin.dispatchListen( 'frame', onFrame )

  return dispatcher

  function onFrame( e ) {
    e = e.data
    currentFrame = e
    _.extend( loopin.clock, currentFrame )
    loopin.emit('frame', currentFrame )
    dispatcher.emit('frame', currentFrame )
    return true
  }

}
