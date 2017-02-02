module.exports = Loopin

const _ = require('lodash')
    , Promise = require('bluebird-extra').usePromise(require('bluebird'))
    , H = require('horten')
    , stream = require('stream')
    , EventEmitter = require('events')
    , inherits = require('util').inherits

inherits( Loopin, EventEmitter )

function Loopin() {
  const loopin = Object.create( Loopin.prototype )

  var connection
    , _paths = Object.create( null )
    , plugins = {}

  EventEmitter.call( loopin )

  loopin.H = H
  loopin.Promise = Promise
  loopin.inherits = inherits
  loopin.EventEmitter = EventEmitter

  loopin.plugin = plugin

  loopin.plugin( 'log' )
  loopin.plugin( 'close' )
  loopin.plugin( 'patch' )
  loopin.plugin( 'dispatch' )


  loopin._map = _map



  //
  // Questionable Plugin Stuff
  //

  function _newPathOb( path ) {
    const pathOb = {}
        , key = H.path.last( path )

    path = H.path.resolve( path )

    pathOb.loopin = loopin
    pathOb.path = path
    pathOb.key = key
    pathOb.log = ( type, data ) => loopin.log( type, path, data )
    pathOb.patch = ( data, localPath ) =>
      loopin.patch( data, H.path.resolve( path, localPath ) )

    _paths[key] = pathOb

    return pathOb
  }

  function _map( prefix, ctor ) {
    prefix = H.path.resolve( prefix )

    // Make sure constants from ctor are copied to
    // generator
    _.extend( generator, ctor )

    return generator

    function generator ( key, args ) {
      const path = prefix + key
      let child = _paths[path]
        , result

      if ( !child ) {
        child = _newPathOb( path )
      }

      if ( child && ctor ) {
        let ctorArgs = _.slice( arguments, 1 )
        result = ctor.apply( child, ctorArgs )
      }

      return result || child
    }
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

  return loopin
}
