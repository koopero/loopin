module.exports = loopinMouse

const _ = require('lodash')

function loopinMouse() {
  const loopin = this

  loopin.plugin('dispatch')


  const dispatcher = new loopin.EventEmitter()
  const state = {
    x:    NaN,
    y:    NaN,
    down: 0,
    in:   NaN
  }

  loopin.mouse = dispatcher
  loopin.mouseX = () => state.x
  loopin.mouseY = () => state.y
  loopin.mouseDown = () => state.down

  loopin.dispatchListen('input/', onInput )

  return dispatcher

  function onInput( event ) {
    const data = event.data
        , type = event.type
        , x = parseFloat( data.x )
        , y = parseFloat( data.y )

    switch( type ) {
      case 'mouseenter': state.in = 1; break
      case 'mouseexit': state.in = 0; break
      case 'mousedown': state.down = 1; break
      case 'mouseup': state.down = 0; break
    }

    if ( !isNaN( x ) ) state.x = x
    if ( !isNaN( y ) ) state.y = y

    if ( isNaN( state.in ) )
      state.in = (
           x >= -1
        && y >= -1
        && x <=  1
        && y <=  1
      ) ? 1 : 0

    _.extend( dispatcher, state )
    dispatcher.emit( type, state )
    return true
  }

}
