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

  var capturePath

  EventEmitter.call( stdio )

  loopin.patch = patch
  function patch( value ) {
    value = util.wrapObjectInPath( value, path )

    const json = JSON.stringify( value )
    proc.stdin.write( json+'\n' )
  }

  const dispatch = stdio.emit.bind( stdio, 'event' )

  const warn = function ( line ) {
    console.warn( line )
    if ( line )
      stdio.emit( 'warn', line )
  }

  proc.stdout.setEncoding( 'utf8' )
  const stdout = byline( proc.stdout )
  stdout.on( 'data', function ( line ) {
    try {
      var event = JSON.parse( line )
    } catch ( e ) {
      capture(line)
      return
    }

    if ( !_.isObject( event )
      || !_.isString( event.type )
      || !_.isString( event.path )
    ) {
      capture(line)
      return
    }

    switch ( event.type ) {
      case 'captureStart':
        captureKey = event.path
      break

      case 'captureEnd':
        captureKey = null
      break

      default:
        event.capture = captureGet( event.path )
        loopin.dispatch( event )
    }


  })

  proc.stderr.setEncoding( 'utf8' )
  const stderr = byline( proc.stderr )
  stderr.on('data', capture )

  function capture( line ) {
    if ( captureKey ) {
      captureData[captureKey] = captureData[captureKey] || ''
      captureData[captureKey] += line
    }

    //TODO: Uncaptured stdio noise
  }

  function captureGet( path ) {
    if ( captureData[captureKey] ) {
      var result = captureData[captureKey]
      captureData[captureKey] = ''
      return result
    }
  }

  return stdio
}
