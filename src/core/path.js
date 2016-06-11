module.exports = loopinPath

const SEP = '/'


function loopinPath() {
  const loopin = this

  loopin.pathResolve = resolve
  loopin.pathWrap = wrap


}

function wrap( data, path ) {
  path = resolve( path )
  path = path.split( SEP )
  path = path.filter( (a )=>!!a )

  path.map( function ( seg ) {
    var wrap = {}
    wrap[seg] = data
    data = wrap
  } )

  return data
}

function resolve() {
  var result = ''

  for( var i = 0; i < arguments.length; i ++ ) {
    eachArg( arguments[i] )
  }

  function eachArg( arg ) {
    if ( 'number' == typeof arg )
      arg = Math.floor(arg).toFixed(0)

    if ( 'string' == typeof arg ) {
      arg.split( SEP ).map( eachToken )
    }
  }

  function eachToken( tok ) {
    tok = tok || ''

    while ( tok[0] == SEP )
      tok = tok.substr( 1 )

    result = result + tok

    if ( result[result.length-1] != SEP )
      result = result + SEP
  }

  if ( result[result.length-1] != SEP )
    result = result + SEP

  return result
}
