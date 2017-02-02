module.exports = loopinDispatch

const Event = require('../core/event')

function loopinDispatch() {
  const loopin = this
      , Promise = loopin.Promise

  const listeners = Object.create( null )

  loopin.dispatchListen = listen
  loopin.dispatchEvent = dispatchEvent

  return

  function listen( path, callback ) {
    return new Promise( function ( resolve, reject ) {
      if ( !listeners[path])
        listeners[path] = []

      listeners[path].push( onEvent )

      function onEvent( event ) {
        if ( 'function' == typeof callback ) {
          var callbackResult = callback( event )
        }

        resolve( event )
        return callbackResult
      }
    })
  }

  function dispatchEvent( event ) {
    event = Event(event)
    const type = event.type
        , path = event.path
        , key = event.type + '::' + path

    runListeners( '*' )
    runListeners( type )
    runListeners( path )
    runListeners( key )

    function runListeners( key ) {
      const listenersForKey = listeners[key]
      if ( Array.isArray( listenersForKey ) ) {
        listeners[key] = listenersForKey.map( function ( listener ) {

          var result = listener.call( loopin, event )

          if ( result )
            return listener
        }).filter( ( l ) => !!l )
      }
    }
  }

}
