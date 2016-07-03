require('./test')( 'layer', 'composite', function ( loopin ) {

  return loopin.Promise.resolve()
  .then( () => loopin.testDelay( 3000 ) )

} )
