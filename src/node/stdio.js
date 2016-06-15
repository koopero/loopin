module.exports = Stdio

const util = require('../core/util')

const _ = require('lodash')
    , EventEmitter = require('events')
    , byline = require('byline')
    , path = require('path')


require('util').inherits(Stdio, EventEmitter);

function Stdio( proc ) {
  const loopin = this

  const stdio = Object.create( Stdio.prototype )
      , captureData = {}

  stdio.proc = proc

  var captureKey

  EventEmitter.call( stdio )


  loopin.on('close', onClose )


  var _destroy = loopin.destroy

  function onClose() {
    if ( stdio.proc ) {
      stdio.proc.kill()
    }
  }

  loopin._patchStream.on('data',patch)

  proc.stdout.setEncoding( 'utf8' )
  const stdout = byline( proc.stdout )
  proc.stderr.setEncoding( 'utf8' )
  const stderr = byline( proc.stderr )
  stdout.on('data', ( line ) => onLine( line ) )
  stderr.on('data', ( line ) => onLine( line, true ) )



  function patch( value ) {
    // console.warn('stdio.patch', value )
    const json = JSON.stringify( value )
    proc.stdin.write( json+'\n' )
  }

  function warn ( line ) {
    console.warn( line )
    if ( line )
      stdio.emit( 'warn', line )
  }


  function onLine( line, isErr ) {
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
        event.data.stderr = captureGet( event.path )
        loopin.dispatch( event )
    }
  }




  function capture( line, isErr ) {
    // console.log('CAPTURE', captureKey, line )
    if ( captureKey ) {
      captureData[captureKey] = captureData[captureKey] || ''
      captureData[captureKey] += line
    } else {
      warn( line )
    }

    //TODO: Uncaptured stdio noise
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
