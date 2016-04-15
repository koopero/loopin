module.exports = Loopin

const _ = require('lodash')
const util = require('./util')

function Loopin() {
  const loopin = Object.create( Loopin.prototype )

  var connection
    , plugins = []
    , listeners = Object.create( null )

  loopin.dispatch = dispatch
  loopin.read = read
  loopin.listen = listen
  loopin.pluginAdd = pluginAdd



  function read( path ) {
    path = path || ''
    patch( path, 'read' )
    return listen( 'read::'+path )
      .then( function ( event ) {
        return event.data
      } )
  }


  function listen( path, callback ) {
    return new Promise( function ( resolve, reject ) {
      if ( !listeners[path])
        listeners[path] = []

      listeners[path].push( onEvent )

      function onEvent( event ) {
        if ( _.isFunction( callback ) ) {
          var callbackResult = callback( event )
        }

        resolve( event )
        return callbackResult
      }
    })
  }

  //
  // Plugins
  //


  function pluginAdd( plugin ) {
    if ( _.isFunction( plugin ) ) {
      plugin = plugin.apply( this, _.slice( arguments, 1 ) ) || plugin
    }

    if ( plugin && plugin.loopin  ) {
      _.extend( loopin, plugin.loopin )
      plugin.loopin = loopin
    }

    plugins.push( plugin )
  }

  //
  // Events
  //

  function dispatch( event ) {
    const type = event.type
        , path = event.path
        , key = event.type + '::' + path

    runListeners( '*' )
    runListeners( type )
    runListeners( path )
    runListeners( key )

    function runListeners( key ) {
      const listenersForKey = listeners[key]
      if ( _.isArray( listenersForKey ) ) {
        listeners[key] = listenersForKey.map( function ( listener ) {

          if ( _.isFunction( listener ) ) {
            var result = listener.call( loopin, event )
          }

          if ( result )
            return listener
        }).filter( ( l ) => !!l )
      }
    }
  }

  return loopin
}
