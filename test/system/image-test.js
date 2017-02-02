require('./test')( 'image-test', function ( loopin ) {
  loopin.plugin('image')

  loopin.patch( "Loading", 'osd/server' )

  loopin.patch('out', 'show/')


  return loopin.image('out', 'image/bars.png' )
    .then(( data ) => {
      loopin.patch( "Loaded", 'osd/server' )
    })
    .then(() => loopin.testDelay() )
})
