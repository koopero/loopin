module.exports = loopinTest

const _ = require('lodash')
    , Promise = require('bluebird')

function loopinTest() {
  const loopin = this

  loopin.plugin('log')
  loopin.plugin('read')


  loopin.testLog = loopin.log.bind( loopin, '_test_')
  loopin.testBenchmark = testBenchmark.bind( loopin )
  loopin.testDelay = testDelay.bind( loopin )
  loopin.testResult = testResult.bind( loopin )

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

  return Promise.resolve()
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
  return new Promise( function ( resolve ) {
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
