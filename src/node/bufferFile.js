module.exports = loopinBufferFile

bufferFile.options = require('boptions')({
  '#inline': ['dest'],
  format: 'png',
  dest: '#string',
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
      , key = self.key

  //
  // Object setup
  //

  //
  //
  //

  const opt = bufferFile.options( arguments )
  // console.log('bufferFile', opt, arguments )

  var dest

  if ( opt.dest ) {
    dest = opt.dest
  } else {
    var extension = util.leadingDot( opt.format )
      , name = key+'.BF'+extension

    dest = loopin.tmpFile( { template: opt.template, name: name } )
  }

  var promise = Promise.resolve()

  if ( opt.save ) {
    var savePromise = loopin.save( key, dest )
    if ( opt.wait ) {
      promise = promise.then( () => savePromise )
    }
  }

  promise = promise.then( () => dest )

  return promise
}
