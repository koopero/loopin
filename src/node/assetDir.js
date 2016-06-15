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
  'watch': false
})

const Promise = require('bluebird-extra').usePromise(require('bluebird'))
    , globlib = require('glob')
    , globAsync = Promise.promisify( globlib )
    , globSync = globlib.sync
    , pathlib = require('path')

function loopinAssetDir() {
  const loopin = this

  loopin.assetDir = assetDir.bind( loopin )
}

function assetDir() {
  const loopin = this
      , self = Object.create( assetDir.prototype )
      , opt = assetDir.options( arguments )
      , dir = loopin.filesResolve( opt.dir )

  self.scan = scan
  self.scanSync = scanSync
  self.watch = watch
  self.unwatch = unwatch

  loopin.on('close', unwatch )

  if ( opt.scan )
    scan()

  return self

  function file( path ) {
    const extWithDot = pathlib.extname( path )
        , ext = extWithDot.substr( 1 )
        , key = pathlib.basename( path, extWithDot )

    if ( opt.extensions.indexOf( ext ) == -1 )
      return

    if ( opt.callback )
      opt.callback( path, key, ext )
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

  }

  function unwatch() {

  }
}
