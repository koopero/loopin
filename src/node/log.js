module.exports = loopinLog
loopinLog.options = require('boptions')({
  'ignore': {
    type: 'array',
    value: ['frame','patch','mousemove','pixels']
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
      , styles = {
        type: chalk.cyan,
        path: chalk.magenta,
        delim: chalk.dim,
        key: chalk.blue,
        value: chalk.red,
        section: chalk.white
      }

  loopin.plugin( 'dispatch' )

  loopin.log = log
  loopin.logSection = logSection
  loopin.logShow = logShow
  loopin.logIgnore = logIgnore
  loopin.logEvent = logEvent
  loopin.logError = logError

  loopin.dispatchListen( '*', logEvent )

  function log() {
    var e = event.fromArguments( arguments )
    logEvent( e )
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

    treebird( data, type, path )

    return true
  }
}
