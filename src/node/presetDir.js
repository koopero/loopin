'use strict'

module.exports = presetDir
presetDir.options = require('boptions')( {
  '#inline': 'dir',
  'dir': 'preset',
  'async': false,
  'autoload': true
})

presetDir.extensions = ['json','yaml']

const _ = require('lodash')
    , yaml = require('js-yaml')

const yamlTop = require('../util/yamlTop')

function presetDir() {
  const loopin = this
      , Promise = loopin.Promise
      , fs = Promise.promisifyAll( require('fs') )


  loopin.plugin( 'log' )
  loopin.plugin( 'preset' )
  loopin.plugin( 'assetDir' )
  loopin.presetDir = presetDir.bind( loopin )

  const opt = presetDir.options( arguments )
      , dir = loopin.filesResolve( opt.dir )

  loopin.log('presetDir', {
    dir: dir,
    root: loopin.filesRoot()
  } )


  const assetDir = loopin.assetDir({
    dir: dir,
    extensions: presetDir.extensions,
    callback: opt.async ? loadPresetAsync : loadPresetSync,
    deep: true,
    watch: true,
    scan: false
  })

  return opt.async ? assetDir.scan() : assetDir.scanSync()

  function loadPresetSync( path, key, type ) {
    path = loopin.filesAbsolute( path )

    var source, data

    try {
      source = fs.readFileSync( path, 'utf8')
      data = yaml.load( source )
    } catch( err ) {
      loopin.logError( {
        type: 'fileLoadError',
        path: '/presetDir',
        data: {
          src: path
        }
      } )
    }


    var meta = {
      source: source
    }

    if ( !data )
      return

    if ( _.isString( data.title ) ) {
      meta.title = data.title
    }
    delete data.title

    meta.description = yamlTop( source )

    loopin.presetAdd( key, data, meta )

    if ( opt.autoload )
      loopin.preset( key )
  }

  function loadPresetAsync( path ) {
    path = loopin.filesAbsolute( path )
    return fs.readFileAsync( path, 'utf8' )
    .then( yaml.load )
    .catch( function ( err ) {
      loopin.logError( {
        type: 'fileLoadError',
        path: '/presetDir',
        data: {
          src: path
        }
      } )
    })
    .then( function ( data ) {
      if ( data ) {
        loopin.presetAdd( key, data )
        if ( opt.autoload )
          loopin.preset( key )
      }
    } )
  }
}
