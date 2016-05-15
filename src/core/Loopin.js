module.exports = Loopin

const _ = require('lodash')
const util = require('./util')

function Loopin() {
  const loopin = Object.create( Loopin.prototype )

  var connection
    , listeners = Object.create( null )

  loopin.dispatch = dispatch
  loopin.listen = listen
  loopin.plugin = plugin


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
  var plugins = {}

  function plugin( plugin ) {
    var key

    if ( _.isString( plugin) ) {
      key = plugin
      if ( !_.isUndefined( plugins[key] ) )
        return plugins[key]

      const dir = Loopin.plugins
      plugin = dir && dir[key]

      if ( !plugin )
        throw new Error( "plugin '"+key+"' not found" )
    }

    key = key || plugin.key

    if ( _.isFunction( plugin ) ) {
      plugin = plugin.apply( this, _.slice( arguments, 1 ) ) || plugin
    }

    key = key || plugin.key

    plugins[key] = plugin

    return plugin
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
