module.exports = loopinSave

loopinSave.options = require('boptions')({
  '#inline': [ 'key', 'dest' ],
  key: '#string',
  dest: '#string',
  format: '#string',
  quality: '#string',
})

const _ = require('lodash')
    , pathlib = require('path')

function loopinSave() {
  const loopin = this
  const Promise = loopin.Promise

  loopin.save = save

  function save( key, url ) {
    const opt = loopinSave.options( arguments )
    key = opt.key

    if ( !opt.dest ) {
      opt.dest = key +'.png'
    }

    const path = 'save/'+key
        , patch = opt

    // Openframeworks kind of sucks at writing files with the wrong
    // file extensions, so give it a little hint.
    const extname = pathlib.extname( opt.dest )
    patch['format'] = patch['format'] || (
      extname == '.png' ? 'png' :
      extname == '.jpg' ? 'jpg' : undefined
    )

    return Promise.fromCallback( function ( cb ) {
      loopin.patch( patch, path )
      loopin.listen( path, function ( e ) {
        if ( e.type == 'save' ) {
          // sucess
          cb( null, e )
        } else if ( e.type == 'error' ) {
          cb( e )
        } else {
          // Not an event we care about.
          // Returning true listens for the next one.
          return true
        }
      } )
    })
  }
}
