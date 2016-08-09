module.exports = presetDir
presetDir.options = require('boptions')( {
  '#inline': 'dir',
  'dir': 'preset',
  'async': false,
})

presetDir.extensions = ['json','yaml']

const _ = require('lodash')
    , path = require('path')
    , Promise = require('bluebird-extra')
    , glob = require('glob')
    , globAsync = Promise.promisify( glob )
    , fs = Promise.promisifyAll( require('fs') )
    , yaml = require('js-yaml')

const yamlTop = require('../util/yamlTop')


function presetDir() {
  const loopin = this

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
    scan: false
  })

  return opt.async ? assetDir.scan() : assetDir.scanSync()

  function loadPresetSync( path, key, type ) {
    path = loopin.filesAbsolute( path )
    var source = fs.readFileSync( path, 'utf8')
      , data = yaml.load( source )
      , meta = {
        source: source
      }

    if ( _.isString( data.title ) ) {
      meta.title = data.title
    }
    delete data.title

    meta.description = yamlTop( source )

    loopin.presetAdd( key, data, meta )
  }

  function loadPresetAsync( file ) {
    return fs.readFileAsync( file, 'utf8' )
    .then( yaml.load )
    .then( function ( data ) {
      loopin.presetAdd( key, data )
    } )
  }
}
