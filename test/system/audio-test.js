require('./test')( 'audio-test', function ( loopin ) {
  loopin.patch({
    audio: {
      test: {
      }
    },
    show: {
      buffer: 'test',
      filter: 'nearest'
    }
  })

  return loopin.testDelay(30000)
})
