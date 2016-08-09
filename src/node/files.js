'use strict'

module.exports = files

files.options = require('boptions')({
  '#inline': ['root'],
  root: '#string'
})

const _ = require('lodash')
const pathlib = require('path')

function files () {
  const loopin = this
      , opt = files.options( arguments )
      , Promise = loopin.Promise
      , fs = Promise.promisifyAll( require('fs-extra') )

  var _root

  loopin.filesRoot = root
  loopin.filesResolve = resolve
  loopin.filesAbsolute = absolute
  loopin.filesRelative = relative


  loopin.fileLoadText = function ( path ) {
    path = resolve( path )
    return fs.readFileAsync( path, 'utf8' )
  }

  function root( newRoot ) {
    _root = newRoot || _root || opt.root || process.cwd()
    return _root
  }

  function absolute () {
    return pathlib.resolve
      .bind( null, loopin.filesRoot() )
      .apply( null, _.filter( arguments ) )
  }

  function relative( path ) {
    var _root = root()


    if ( _root[_root.length-1] != '/' )
      _root += '/'

    if ( path.substr( 0, _root.length ) == _root )
      path = path.substr( _root.length )

    return path
  }


  function resolve () {
    var path = pathlib.join
      .apply( null, _.filter( arguments ) )

    return path
  }

}
