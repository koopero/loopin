require('./test')( 'text-test', 'text-test', function ( loopin ) {
  return Promise.resolve()
  .then( () => loopin.testDelay() )

} )
