const _ = require('lodash')
    , EOL = require('os').EOL
module.exports = function yamlTop( source ) {
  var lines = []

  do {
    var match = source.match(/^(.*?)\r?\n/)
    if ( match ) {
      source = source.substr( match[0].length )
      var line = match[1]
      if ( line[0] == '#' ) {
        lines.push( line )
        continue
      } else if ( !_.trim( line ) && !lines.length )
        continue
    }
    break
  } while ( true )

  lines = lines.map( ( line ) => line.replace( /^#\s*/g, '' ) )

  while ( !lines[0] )
    lines.shift()

  while ( !lines[lines.length-1] )
    lines.pop()

  return lines.join(EOL)
}
