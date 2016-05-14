module.exports = save

const options = require('boptions')({
  '#inline': [ 'key', 'dest' ],
  key: {
    '#type': 'string'
  },

  dest: {
    '#type': 'string'
  },

  format: {
    '#type': 'string'
  },

  quality: {
    '#type': 'string'
  },

})

const _ = require('lodash')
    , pathlib = require('path')

const Promise = require('bluebird')


function save() {
  const loopin = this

  loopin.save = save

  function save( key, url ) {
    const opt = options( arguments )
    key = opt.key
    dest = opt.dest

    if ( !dest ) {
      dest = key +'.png'
    }

    const path = 'save/'+key
        , patch = _.pick( opt, 'dest', 'iterations', 'format', 'quality' )

    patch.dest = dest

    // Openframeworks kind of sucks at writing files with the wrong
    // file extensions, so give it a little hint.
    const extname = pathlib.extname( dest )
    patch['format'] = (
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
          cb( e.data )
        } else {
          // Not and event we care about.
          // Returning true listens for the next one.
          return true
        }
      } )
    })
  }
}
