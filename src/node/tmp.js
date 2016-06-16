module.exports = loopinTmp

loopinTmp.options = require('boptions')({
})

const tmpFile_options = require('boptions')({
  '#inline': 'name',
  'name': 'anon.bin',
  'template': 'tmp/%06i.%16b.%r%8e'
})


const UNF = require('unique-file-name')

function loopinTmp() {
  const loopin = this
      , opt = loopinTmp.options( arguments )

  loopin.plugin('frame')

  loopin.tmpFile = tmpFile

  function tmpFile( _template_ ) {
    const opt = tmpFile_options( arguments )
        , frame = loopin.frame()
        , name = opt.name
        , index = frame.index
        , time = frame.time
        , template = opt.template

    console.log( 'tmpFile', template, name, index, time )

    template = loopin.filesResolve( template )

    return UNF.format( template, name, index, time )


  }
}
