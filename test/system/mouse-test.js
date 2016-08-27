require('./test')( 'mouse-test', function ( loopin ) {

  loopin.plugin('mouse')
  loopin.plugin('animate')
  loopin.animate( function ( frame ) {
    // console.log('test-animate', frame )
  } )

  return Promise.resolve()
  .then( () => loopin.testDelay( 30000 ) )
} )
