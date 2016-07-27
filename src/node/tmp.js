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
        , name = opt.name
        , frame = loopin.frame()
        , relPath = UNF.format( opt.template, name, frame.index, frame.time )
        , absPath = loopin.filesAbsolute( relPath )
        , result = {
          file: relPath,
          absolute: absPath,
          created: new Date().getTime()
        }

    Object.defineProperty( result, 'age', {
      enumerable: true,
      configurable: true,
      get: () =>  new Date().getTime() - parseFloat( result.created )
    } )

    return result
  }
}

function tmpFile() {
  const self = this


}
