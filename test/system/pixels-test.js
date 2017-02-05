const assert = require('chai').assert

require('./test')( 'pixels-test', function ( loopin ) {
  const Colour = require('deepcolour')
  let width = 32
    , channels = 'rgb'
    , outputChannels = 'rgb000'
    , size = width * channels.length
    , pixels = Buffer.alloc( size )
    , colour = new Colour()

  colour.saturation = 0.5
  colour.value = 0.8

  for ( let x = 0; x < width; x++ ) {
    colour.hue = x / width
    let c = colour.toBuffer()
    c.copy( pixels, x * channels.length )
  }

  loopin.patch({
    pixels: {
      pixels_out: {
        pixels: pixels.toString('base64'),
        buffer: 'out',
        format: 'base64',
        channels
      }
    },
    show: {
      buffer: 'out',
      filter: 'linear'
    }
  })

  let eventNum = 0

  loopin.dispatchListen('pixels', function ( event ) {
    const pixels = new Buffer( event.data.pixels, 'base64')
    assert( Buffer.isBuffer( pixels ) )
    assert.equal( pixels.length, outputChannels.length * width )
    eventNum ++
    return true
  })

  return loopin.testDelay()
  .then( () => loopin.patch( { output: 'once', channels: outputChannels }, '/pixels/pixels_out' ) )
  .then( () => loopin.testDelay() )
  .then( () => {
    assert.equal( eventNum, 1)
  })
})
