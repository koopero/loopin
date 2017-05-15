const assert = require('chai').assert

require('./test')( 'pixels-test', function ( loopin ) {

  return loopin.Promise.resolve()
  .then( () => testBase64() )
  .then( () => testUnclamped() )
  .then( () => testReadFloat() )
  .then( () => testWriteFloat() )
  .then( () => testWriteHex() )
  .then( () => testWriteHex2() )

  function testWriteHex() {
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          testWriteHex: {
            format: 'hex',
            channels: 'rgb',
            data: 'ffff00 ff00ff 00ffff'
          }
        },
        show: 'testWriteHex'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.read(`buffer/testWriteHex`) )
    .then( ( data ) => {
      assert.equal( data.width, 3 )
      assert.equal( data.height, 1 )
    })
    .then( () => loopin.testDelay() )
  }

  function testWriteHex2() {
    const bufferName = 'testWriteHex2'
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          testWriteHex2: {
            format: 'hex2',
            channels: 'rgb',
            width: 2,
            data: 'f00 0f0 00f fff'
          }
        },
        show: 'testWriteHex2'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.read(`buffer/testWriteHex2`) )
    .then( ( data ) => {
      assert.equal( data.height, 2 )
    })
    .then( () => loopin.testDelay() )
  }

  function testWriteFloat() {
    const bufferName = 'testWriteFloat'
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          testWriteFloat: {
            format: 'float',
            channels: 'r',
            width: 3,
            data: '0 1 0 1 0.5 1 0 1 0'
          }
        },
        show: 'testWriteFloat'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.read(`buffer/testWriteFloat`) )
    .then( ( data ) => {
      assert.equal( data.height, 3 )
    })
    .then( () => loopin.testDelay() )
  }

  function testReadFloat() {
    return loopin.Promise.resolve(
      loopin.patch( {
        pixels: {
          _0_write: {
            buffer: 'testReadFloat',
            format: 'hex2',
            channels: 'rgb',
            width: 2,
            data: 'f00 0f0 00f fff'
          },

          _1_read: {
            buffer: 'testReadFloat',
            format: 'float',
            channels: 'rgba'
          }
        },
        show: 'testReadFloat'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch('once','pixels/_1_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      data = data.split(/[^\d\.\-e]+/)
      data = data.map( ( v ) => parseFloat(v) )
      assert.deepEqual( data, [
        1,0,0,1,  0,1,0,1,
        0,0,1,1,  1,1,1,1
      ])
    })
    .then( () => loopin.testDelay() )
  }

  function testUnclamped() {
    return loopin.Promise.resolve()
    .then( () =>
      loopin.patch( {
        buffer: {
          testUnclamped: {
            format: 'rgb32'
          }
        },
        pixels: {
          _2_write: {
            buffer: 'testUnclamped',
            format: 'percent',
            channels: 'rgb',
            data: '-100 50 200'
          },

          _3_read: {
            buffer: 'testUnclamped',
            format: 'float',
            channels: 'rgba'
          }
        },
        show: 'testUnclamped'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch('once','pixels/_3_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      data = data.split(/[^\d\.\-e]+/)
      data = data.map( ( v ) => parseFloat(v) )
      assert.deepEqual( data, [ -1, 0.5, 2, 1 ] )
    })
    .then( () => loopin.testDelay() )
  }


  function testBase64() {
    let pixels = [ 200, 0, 0, 100, 0, 0, 200, 200 ]
      , buff = new Buffer( pixels )
      , base64 = buff.toString('base64')

    return loopin.Promise.resolve()
    .then( () =>
      loopin.patch( {
        pixels: {
          _4_write: {
            buffer: 'testBase64',
            format: 'rgba',
            channels: 'rgba',
            data: base64
          },

          _5_read: {
            buffer: 'testBase64',
            format: 'base64',
            channels: 'rgba'
          }
        },
        show: 'testBase64'
      })
    )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch('once','pixels/_5_read/output') )
    .then( () => loopin.dispatchListen('pixels') )
    .then( ( event ) => {
      let data = event.data.data
      assert.deepEqual( data, base64 )
    })
    .then( () => loopin.read('buffer/testBase64') )
    .then( ( data ) => {
      assert.equal( data.width, 2 )
      assert.equal( data.height, 1 )
    } )
    .then( () => loopin.testDelay() )
  }

  // const Colour = require('deepcolour')
  // let width = 32
  //   , channels = 'rgb'
  //   , outputChannels = 'rgb000'
  //   , size = width * channels.length
  //   , pixels = Buffer.alloc( size )
  //   , colour = new Colour()
  //
  // colour.saturation = 0.5
  // colour.value = 0.8
  //
  // for ( let x = 0; x < width; x++ ) {
  //   colour.hue = x / width
  //   let c = colour.toBuffer()
  //   c.copy( pixels, x * channels.length )
  // }
  //
  // loopin.patch({
  //   pixels: {
  //     pixels_out: {
  //       pixels: pixels.toString('base64'),
  //       buffer: 'out',
  //       format: 'base64',
  //       channels
  //     }
  //   },
  //   show: {
  //     buffer: 'out',
  //     filter: 'linear'
  //   }
  // })
  //
  // let eventNum = 0
  //
  // loopin.dispatchListen('pixels', function ( event ) {
  //   const pixels = new Buffer( event.data.pixels, 'base64')
  //   assert( Buffer.isBuffer( pixels ) )
  //   assert.equal( pixels.length, outputChannels.length * width )
  //   eventNum ++
  //   return true
  // })
  //
  // return loopin.testDelay()
  // .then( () => loopin.patch( { output: 'once', channels: outputChannels }, '/pixels/pixels_out' ) )
  // .then( () => loopin.testDelay() )
  // .then( () => {
  //   assert.equal( eventNum, 1)
  // })
})
