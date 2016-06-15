module.exports = loopinBufferFile

bufferFile.options = require('boptions')({
  format: 'png',
  dest: { type: 'string' },
  tmp: '%b.%08i.%e',
  save: true,
  wait: true,
})

function loopinBufferFile() {
  const loopin = this

  loopin.plugin('tmp')

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

  function getFilePath() {
    if ( opt.dest )
      return opt.dest

    const filename = key + '.' + format
  }






  const opt = bufferFile.options( arguments )

  // var promise = Promise.resolve( { key: key })
  //
  // return promise
}
