module.exports = files

files.options = require('boptions')({
  root: {
    '#type': 'string',
    '#default': ''
  }
})

const _ = require('lodash')
    , Promise = require('bluebird')
    , fs = Promise.promisifyAll( require('fs-extra') )

const pathlib = require('path')

function files () {
  const loopin = this
      , opt = files.options( arguments )

  loopin.cwd = loopin.cwd || pathlib.resolve( opt.root || '.' )

  loopin.filesResolve = resolve

  loopin.fileLoadText = function ( path ) {
    path = resolve( path )
    return fs.readFileAsync( path, 'utf8' )
  }

  function resolve () {
    return pathlib.resolve
      .bind( null, loopin.cwd )
      .apply( null, _.filter( arguments ) )
  }

}
