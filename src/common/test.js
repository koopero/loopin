module.exports = loopinTest

const _ = require('lodash')

function loopinTest() {
  const loopin = this

  loopin.plugin('log')
  loopin.plugin('read')
  loopin.plugin('dispatch')



  loopin.testLog = loopin.log.bind( loopin, '_test_')
  loopin.testBenchmark = testBenchmark.bind( loopin )
  loopin.testDelay = testDelay.bind( loopin )
  loopin.testResult = testResult.bind( loopin )
  loopin.testPatchAndDisplay = testPatchAndDisplay.bind( loopin )

  loopin.testAnimate = testAnimate.bind( loopin )

}

testBenchmark.options = require('boptions')({
  '#inline': ['func'],
  func: '#function',
})

function testBenchmark() {
  const loopin = this
      , opt = testBenchmark.options( arguments )

  if ( !opt.func )
    throw new Error('no function to benchmark')

  var startTime
    , endTime
    , duration

  return loopin.Promise.resolve()
  .then( function () {
    // Start clock
    startTime = new Date().getTime()
    loopin.logSection('benchmark')
  })
  .then( opt.func )
  .then( function( result ) {
    endTime = new Date().getTime()
    duration = endTime - startTime

    loopin.testLog( 'benchmark', { duration: formatTime( duration ) })
    loopin.testLog( 'result', { data: result } )
    return result
  })

  function formatTime( time ) {
    return time.toFixed(3)
  }
}

testDelay.options = require('boptions')({
  '#inline': ['duration'],
  duration: 3000
})

function testDelay() {
  const opt = testDelay.options( arguments )
      , loopin = this

  return new (loopin.Promise)( function ( resolve ) {
    setTimeout( resolve, opt.duration )
  })
}

testResult.options = require('boptions')({
  '#inline': ['path','name', 'delay'],
  path: '',
  name: 'result',
  delay: 200
})

function testResult() {
  const loopin = this
      , opt = testResult.options( arguments )

  return loopin.testDelay( opt.delay )
  .then( () => loopin.read( opt.path ) )
  .then( ( data ) => loopin.log( opt.path, opt.name, { data: data } ) )

}

function testPatchAndDisplay( data, path ) {
  const loopin = this
      , display = _.trim( require('js-yaml').dump( data ) )

  loopin.patch( display, 'osd/text/')
  loopin.patch( data, path )
}


testAnimate.options = require('boptions')({
  '#inline': ['path','to','duration', 'from'],
  path: '',
  to: 1,
  from: 0,
  duration: 3
})

function testAnimate() {
  const loopin = this
      , opt = testAnimate.options( arguments )
      , path = opt.path

  var _startClock = NaN
    , _to = opt.to
    , _from = opt.from


  if ( isNaN( _from ) )
    _from = loopin.read( path )
      .then( ( y ) => parseFloat( y ) || 0 )


  return new (loopin.Promise)( function ( resolve, reject ) {

    loopin.dispatchListen( 'frame', onFrame )

    function onFrame( event ) {
      const frame = event.data
      if ( isNaN( _startClock) ) {
        _startClock = parseFloat( frame.time )
      }

      var time = frame.time - _startClock
        , x = Math.min( 1, time / opt.duration )

      Promise.resolve( _from )
      .then( function ( _from ) {
        var value = _from + ( _to - _from ) * x
        loopin.patch( value, path )
      })

      if ( x >= 1 ) {
        resolve()
      } else {
        // Important! Tells loopin to keep the listener
        return true
      }
    }
  })
}
