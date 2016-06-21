require('./test')( 'window-test', 'indian', function ( loopin ) {

  return loopin.read("window")
  .then( ( data ) => loopin.log( 'initial', '_test', { data: data } ) )
  .then( () => loopin.testResult( 'window',  'initial' ) )

  .then( () => loopin.patch( { fullscreen: true }, 'window' ) )
  .then( () => loopin.testResult( 'window', 'fullscreen' ) )

  .then( () => loopin.patch( { fullscreen: true, width: 256, height: 224 }, 'window' ) )
  .then( () => loopin.testResult( 'window', 'snes' ) )

} )
