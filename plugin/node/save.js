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

    const patch = { dest: dest }
    loopin.patch( patch, 'save/'+key )
  }
}
