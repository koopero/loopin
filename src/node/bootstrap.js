module.exports = bootstrap
bootstrap.options = require('boptions')( {

})


const Loopin = require('../core/loopin')

const loopinNative = require('loopin-native')



function bootstrap() {
  const opt = bootstrap.options( arguments )

  const loopin = this
      , Promise = loopin.Promise

  loopin.plugin('files')

  // console.log( 'bootstrap', opt )
  const nativeOpt = {
    run: true,
    runCwd: loopin.filesAbsolute()
  }

  return loopinNative( nativeOpt )
    .then( function ( build ) {
      loopin.plugin( 'stdio', build.process )
      loopin.dispatchEvent( { path: 'native', type: 'open', data: { pid: build.process.pid } } )
      loopin.emit( 'open' )

      return loopin
    })
}
