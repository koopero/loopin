require('./test')( 'feedback-test', 'feedback', function ( loopin ) {
  return Promise.resolve()
  .then( () => loopin.testDelay( 30000 ) )
} )
