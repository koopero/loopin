module.exports = save

const options = require('boptions')({
  '#inline': [ 'key', 'dest' ],
  key: {
    '#type': 'string'
  },
  dest: {
    '#type': 'string'
  },

})

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
        , patch = { dest: dest }

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
