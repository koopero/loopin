module.exports = loopinLog
loopinLog.options = require('boptions')({
  'ignore': {
    type: 'array',
    value: ['frame','patch','mousemove','pixels','read']
  }
})

const _ = require('lodash')
    , chalk = require('chalk')
    , treebird = require('treebird')

const event = require('../core/event')

function loopinLog() {
  const loopin = this
      , opt = loopinLog.options( arguments )
      , write = process.stdout.write.bind( process.stdout )

  var enabled = false

  loopin.plugin( 'dispatch' )

  loopin.log = log
  loopin.logEnabled = logEnabled
  loopin.logSection = logSection
  loopin.logShow = logShow
  loopin.logIgnore = logIgnore
  loopin.logIsUsed = logIsUsed
  loopin.logEvent = logEvent
  loopin.logError = logError

  loopin.dispatchListen( '*', logEvent )

  function log() {
    // if ( !enabled )
    //   return

    var e = event.fromArguments( arguments )
    logEvent( e )
  }

  function logEnabled( _enabled ) {
    enabled = !!_enabled
    return enabled
  }

  function logShow() {
    _.map( arguments, function ( key ) {
      var ind = opt.ignore.indexOf( key )
      if ( ind != -1 )
        opt.ignore.splice( ind, 1 )
    } )
  }

  function logIgnore() {
    _.map( arguments, function ( key ) {
      var ind = opt.ignore.indexOf( key )
      if ( ind == -1 )
        opt.ignore.push( key )
    } )
  }

  function logIsUsed() {
    return !!(_.find( opt.ignore, ( type ) => type == event.type ) )
  }

  function logSection ( name ) {
    write('\n')

    write( '----------------  ')
    write( name||'' )
    write('\n')
  }

  function logError( event ) {
    logEvent( event )
  }

  function logEvent( event ) {
    if ( _.find( opt.ignore, ( type ) => type == event.type ) )
      return true

    var type = event.type
      , path = event.path
      , data = event.data

    treebird( data, {
      type: type,
      path: path,
      stream: process.stderr
    }, type, path )

    return true
  }
}
