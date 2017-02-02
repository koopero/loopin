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

  loopin.plugin('dispatch')

  loopin.save = save

  function save( key, url ) {
    const opt = loopinSave.options( arguments )
    key = opt.key

    if ( !opt.dest ) {
      opt.dest = key +'.png'
    }

    const path = 'save/'+key+'/'
        , patch = opt

    // Openframeworks kind of sucks at writing files with the wrong
    // file extensions, so give it a little hint.
    const extname = pathlib.extname( opt.dest )
    patch['format'] = patch['format'] || (
      extname == '.png' ? 'png' :
      extname == '.jpg' ? 'jpg' : undefined
    )

    loopin.patch( patch, path )

    return loopin.dispatchListen( path )
    .then( ( event ) => {
      if ( event.type == 'save' ) {
        return event.data
      }

      event._throw()
    } )
  }
}
