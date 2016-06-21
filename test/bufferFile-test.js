const bufferKey = 'indian'

require('./test')( 'bufferFile', bufferKey, function ( loopin ) {
  loopin.plugin('bufferFile')

  return loopin.testBenchmark( function () {
    var result = loopin.bufferFile( bufferKey, 'result/bufferFile-test.png' )
    return result
  } )

} )
