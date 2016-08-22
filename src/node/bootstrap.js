module.exports = bootstrap
bootstrap.options = require('boptions')( {

})


const Loopin = require('../core/loopin')

const native = require('loopin-native')



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

  return native( nativeOpt )
    .then( function ( build ) {
      // console.log('strapped', build )

      loopin.plugin( 'stdio', build.process )
      loopin.dispatch( { path: 'native', type: 'open', data: { pid: build.process.pid } } )
      loopin.emit( 'open' )

      return loopin
    })
}
