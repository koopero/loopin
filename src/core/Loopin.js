module.exports = Loopin

const _ = require('lodash')
    , stream = require('stream')
    , EventEmitter = require('events')
    , inherits = require('util').inherits

inherits( Loopin, EventEmitter )

const util = require('./util')

function Loopin() {
  const loopin = Object.create( Loopin.prototype )

  var connection
    , listeners = Object.create( null )
    , _paths = Object.create( null )
    , plugins = {}

  EventEmitter.call( loopin )

  loopin.patch = patch
  loopin._patchStream = new stream.PassThrough( { objectMode: true } )

  loopin.dispatch = dispatch
  loopin.listen = listen
  loopin.plugin = plugin

  loopin.plugin( require('./path') )
  loopin.plugin( 'log' )

  loopin._map = _map

  function patch( data, path ) {
    loopin.log( path, 'patch', { data: data } )

    data = loopin.pathWrap( data, path )
    loopin._patchStream.push( data )
  }

  function _newPathOb( path ) {
    const pathOb = {}
        , key = util.path.key( path )

    pathOb.loopin = loopin
    pathOb.path = path
    pathOb.key = key
    pathOb.log = ( type, data ) => loopin.log( type, path, data )
    pathOb.patch = ( data, localPath ) =>
      loopin.patch( data, loopin.pathResolve( path, localPath ) )

    _paths[key] = pathOb

    return pathOb
  }

  function _map( prefix, ctor ) {
    prefix = util.path.normalize( prefix )

    // Make sure constants from ctor are copied to
    // generator
    _.extend( generator, ctor )

    return generator

    function generator ( key, args ) {
      const path = prefix + key
      var child = _paths[path]

      if ( !child ) {
        child = _newPathOb( path )
      }

      if ( child && ctor ) {
        const ctorArgs = _.slice( arguments, 1 )
        ctor.apply( child, arguments )
      }

      return child
    }
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
