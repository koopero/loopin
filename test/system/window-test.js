require('./test')( 'window-test', 'indian', function ( loopin ) {

  return loopin.read("window/")
  .then( ( data ) => loopin.log( 'initial', '_test', { data: data } ) )
  .then( () => loopin.testResult( 'window',  'initial' ) )

  .then( () => loopin.patch( { fullscreen: true, title: 'fullscreen' }, 'window' ) )
  .then( () => loopin.testResult( 'window', 'fullscreen' ) )

  .then( () => loopin.patch( { fullscreen: false, title: 'SNES', width: 256, height: 224 }, 'window' ) )
  .then( () => loopin.testResult( 'window', 'snes' ) )
  .then( () => loopin.testDelay() )
} )
