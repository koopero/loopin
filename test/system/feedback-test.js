require('./test')( 'feedback-test', 'feedback', function ( loopin ) {
  return Promise.resolve()
  .then( () => loopin.testPatchAndDisplay( { speed: 0.5 }, 'clock/') )
  .then( () => loopin.testDelay( 30000 ) )

} )
