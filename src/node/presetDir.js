module.exports = presetDir
presetDir.options = require('boptions')( {
  '#inline': 'dir',
  'dir': {

  }
})

const _ = require('lodash')
    , path = require('path')
    , Promise = require('bluebird-extra')
    , glob = require('glob')
    , globAsync = Promise.promisify( glob )
    , fs = Promise.promisifyAll( require('fs') )
    , yaml = require('js-yaml')

function presetDir() {
  const loopin = this

  const extensions = ['json','yaml']

  loopin.presetDir = presetDir

  return Promise.mapSeries( _.slice( arguments ), presetDir )

  function presetDir( dir ) {

    const pattern = path.resolve( dir, '**/*.@(json|yaml)' )
    console.log('presetDir', dir )
    return globAsync( pattern  )
      .mapSeries( eachFile )

    function eachFile( file ) {
      const ext = path.extname( file )
          , rel = _.trim( file.substr( dir.length ), path.sep )
          , key = rel.substr( 0, rel.length - ext.length )

      console.log( 'add', key, file  )

      return fs.readFileAsync( file, 'utf8' )
        .then( yaml.load )
        .then( function ( data ) {
          loopin.presetAdd( key, data )
        } )

    }
  }
}
