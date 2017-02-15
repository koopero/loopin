require('./test')( 'waveform-test', function ( loopin ) {
  loopin.patch({
    waveform: {
      test: {
        duration: 0.01,
        squelch: 0.5,
        phase: 'abs'
      }
    },
    show: {
      buffer: 'test',
      filter: 'nearest'
    }
  })

  return loopin.testDelay(10000)
})
