require('./test')( 'render-test', function ( loopin ) {
  loopin.patch( {
    image:    { indian: "image/indian.png", bars: 'image/bars.png' },
    render:   { out: {
      src: {
        buffer: 'indian',
        wrapH: 'repeat'
      },
      shader: 'passthru',
      tex: {
        src1: 'indian'
      }
    }},
    buffer:   { out: {
      width: 320,
      height: 240
    }},
    show: 'out'
  })

  return loopin.testDelay()
})
