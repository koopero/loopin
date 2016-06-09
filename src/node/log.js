module.exports = log
log.options = require('boptions')({
  'ignore': {
    '#type': 'array',
    '#default': ['frame']
  }
})

const _ = require('lodash')
    , chalk = require('chalk')

function log() {
  const loopin = this
      , opt = log.options( arguments )
      , write = process.stdout.write.bind( process.stdout )
      , styles = {
        type: chalk.cyan,
        path: chalk.magenta,
        delim: chalk.dim,
        key: chalk.blue,
        value: chalk.red
      }

  loopin.listen( '*', listener )

  function listener( event ) {
    if ( _.find( opt.ignore, ( type ) => type == event.type ) )
      return true

    var type = event.type
      , path = event.path
      , data = event.data
      , width = 100
      , typeWidth = 16


    width -= column( type, 'type', typeWidth )
    width -= column( path+' ', 'path' )

    if ( _.isObject( data ) ) {
      var pairsLength = 0
        , pairs = _.map( data, function ( val, key ) {
            if ( _.isUndefined( val ) )
              return
            val = toStr( val )
            pairsLength += val.length + 4
            return style('key', key ) + style('delim', ': ') + style('value', val )
          } )

      if ( pairsLength < width ) {
        column( pairs.join( style('delim', ', ' ) ) )
      } else {
        write("\n")
        write(_.repeat( ' ', typeWidth ) )
        write( pairs.join( "\n" + _.repeat( ' ', typeWidth ) ) )
      }
    }

    write( "\n" )

    return true
  }

  function toStr( val ) {
    if ( _.isNumber( val ) ) {
      return val.toFixed( 3 )
    }

    return JSON.stringify( val )
  }

  function column( data, style, width, padder ) {

    if ( width ) {
      padder = padder || _.padStart
      data = padder( data, width - 1 ) + ' '
    }

    const length = data.length

    data = style && styles[style] ? styles[style]( data ) : data

    write( data )

    return length
  }

  function style( style, data ) {
    return styles[style] ? styles[style]( data ) : data
  }
}
