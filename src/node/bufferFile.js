module.exports = loopinBufferFile

bufferFile.options = require('boptions')({
  '#inline': ['wait'],
  format: 'png',
  template: {},
  save: true,
  wait: true,
})

const util = require('../core/util')

function loopinBufferFile() {
  const loopin = this

  loopin.plugin('tmp')
  loopin.plugin('save')

  loopin.bufferFile = loopin._map( 'bufferFile/', bufferFile )
}


function bufferFile() {
  const self = this
      , loopin = self.loopin
      , Promise = loopin.Promise
      , key = self.key

  //
  // Object setup
  //
  // Cache of last save for every format.
  const _last = self._last = self._last || {}

  //
  // D
  //

  const opt = bufferFile.options( arguments )
  // console.log('bufferFile', opt, arguments )

  //
  var result

  var extension = util.leadingDot( opt.format )
    , hash = opt.format
    , name = key+'.BF'+extension



  var promise = Promise.resolve()

  // console.log('bufferFile', opt, _last, self )

  if ( opt.save ) {
    var savePromise = save()

    if ( opt.wait || !_last[hash] ) {
      promise = promise.then( () => savePromise )
    }
  }

  // The target
  promise = promise.then( () => _last[hash] )

  return promise

  function save() {
    const tmp = loopin.tmpFile( {
      name: name,
      template: opt.template,
    } )

    return loopin.save( key, {
      dest: tmp.file,
      format: opt.format
    } )
    .then( function ( data ) {
      tmp.save = data
      _last[hash] = tmp
    })
    .then( () => tmp )
  }
}
