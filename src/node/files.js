module.exports = files

files.options = require('boptions')({
  '#inline': ['root'],
  root: '#string'
})

const _ = require('lodash')
    , Promise = require('bluebird')
    , fs = Promise.promisifyAll( require('fs-extra') )

const pathlib = require('path')

function files () {
  const loopin = this
      , opt = files.options( arguments )

  var _root

  loopin.filesRoot = root
  loopin.filesResolve = resolve
  loopin.filesAbsolute = absolute


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


  function resolve () {
    var path = pathlib.join
      .apply( null, _.filter( arguments ) )

    return path
  }

}
