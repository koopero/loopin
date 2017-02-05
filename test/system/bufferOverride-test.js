require('./test')( 'bufferOverride-test', function ( loopin ) {

  loopin.patch({
    image: {
      image_loader: {
        buffer: 'out',
        src: 'image/bars.png'
      }
    },
    show: 'out'
  })

  return loopin.testDelay()
})
