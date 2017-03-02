'use strict'

module.exports = loopinAssetDir

assetDir.options = require('boptions')({
  '#inline': ['dir','extensions','callback'],
  'dir': '#string',
  'extensions': {
    type: 'array',
    childType: 'string'
  },
  'callback': '#function',
  'scan': true,
  'deep': false,
  'watch': true
})

const globlib = require('glob')
    , globSync = globlib.sync
    , pathlib = require('path')
    , chokidar = require('chokidar')
    , os = require('os')

function loopinAssetDir() {
  const loopin = this

  loopin.assetDir = assetDir.bind( loopin )
}

function assetDir() {
  const loopin = this
      , self = Object.create( assetDir.prototype )
      , Promise = loopin.Promise
      , globAsync = Promise.promisify( globlib )
      , opt = assetDir.options( arguments )
      , dir = loopin.filesAbsolute( opt.dir )


  self.scan = scan
  self.scanSync = scanSync
  self.watch = watch
  self.unwatch = unwatch

  loopin.on('close', unwatch )


  if ( opt.scan )
    scan()

  if ( opt.watch )
    watch()

  return self

  function file( path ) {
    const extWithDot = pathlib.extname( path )
        , ext = extWithDot.substr( 1 )
        , key = pathlib.basename( path, extWithDot )

    if ( opt.extensions.indexOf( ext ) == -1 )
      return

    if ( opt.callback )
      opt.callback( loopin.filesRelative( path ), key, ext )
  }

  function globPattern() {
    return (opt.deep ? '**.' : '*.')
      +'{'+opt.extensions.join(',')+'}'
  }

  function scan() {
    return globAsync( globPattern(), { cwd: dir } )
      .then( Promise.resolve )
      .map( ( file ) => pathlib.join( dir, file ) )
      .mapSeries( file )
  }

  function scanSync() {
    return globSync( globPattern(), { cwd: dir } )
      .map( ( file ) => pathlib.join( dir, file ) )
      .map( file )
  }

  function watch() {
    if ( !self.watcher ) {

      let usePolling = false

      // Questionable options tuned to work on OSX 10.8
      if ( os.platform() == 'darwin' && os.release() <= '12.5.0' )
        usePolling = true

      self.watcher = chokidar.watch( dir, {
        persistent: false,
        atomic: true,
        usePolling
      } )

      self.watcher.on('add', onWatch )
      self.watcher.on('change', onWatch )
    }
  }

  function onWatch( path, stat ) {
    if ( !stat )
      return

    if ( !stat.isFile() )
      return

    file( path )
  }

  function unwatch() {

  }
}
