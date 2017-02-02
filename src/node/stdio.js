module.exports = loopinStdio

const util = require('../core/util')

const _ = require('lodash')
    , H = require('horten')
    , EventEmitter = require('events')
    , byline = require('byline')
    , path = require('path')


require('util').inherits(loopinStdio, EventEmitter);

function loopinStdio( proc ) {
  const loopin = this

  // Make sure proc is at least close to a real ChildProcess
  if ( !proc || !proc.stdout || typeof proc.stdout.on != 'function' )
    throw new Error('argument must be ChildProcess')

  const stdio = Object.create( loopinStdio.prototype )
      , captureData = {}

  stdio.proc = proc

  var captureKey

  EventEmitter.call( stdio )

  loopin.plugin('patch')

  loopin.hookAdd('close', onClose )
  loopin.hookAdd('patch', onPatch )


  var _destroy = loopin.destroy



  proc.stdout.setEncoding( 'utf8' )
  const stdout = byline( proc.stdout )
  proc.stderr.setEncoding( 'utf8' )
  const stderr = byline( proc.stderr )
  stdout.on('data', ( line ) => onLine( line ) )
  stderr.on('data', ( line ) => onLine( line, true ) )

  onPatch( loopin.patchGet() )

  function onClose() {
    if ( stdio.proc ) {
      stdio.proc.kill()
    }
  }


  function onPatch( value, path ) {
    value = H.wrap( value, path )
    const json = JSON.stringify( value )
    proc.stdin.write( json+'\n' )
  }

  function warn ( line ) {
    console.warn( line )
    if ( line )
      stdio.emit( 'warn', line )
  }


  function onLine( line, isErr ) {
    // console.warn( '!!!!', line )

    try {
      var event = JSON.parse( line )
    } catch ( e ) {}

    if ( !_.isObject( event )
      || !_.isString( event.type )
      || !_.isString( event.path )
    ) {
      capture(line, isErr )
    } else {
      onEvent( event )
    }
  }

  function onEvent( event ) {
    switch ( event.type ) {
      case 'captureStart':
        captureKey = event.path
      break

      case 'captureEnd':
        captureKey = null
      break

      default:
        event.data = event.data || {}
        var cap = captureGet( event.path )
        if ( 'undefined' != typeof cap )
          event.data.stderr = cap
        loopin.dispatchEvent( event )
    }
  }




  function capture( line, isErr ) {
    if ( captureKey ) {
      captureData[captureKey] = captureData[captureKey] || ''
      captureData[captureKey] += line +'\n'
    } else {
      warn( line )
    }
  }

  function captureGet( path ) {
    if ( captureData[path] ) {
      var result = captureData[path]
      captureData[path] = ''
      return result
    }
  }

  return stdio
}
