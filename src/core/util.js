const _ = require('lodash')
const util = exports

util.leadingDot = ( str ) => !str || !str.length ? '' : str[0] == '.' ? str : '.' + str 

util.wrapObjectInPath = function wrapObjectInPath( ob, path ) {
  if ( _.isString( path ) ) {
    path = path.split(/[\.\/]/g)
  }

  if ( _.isArray( path ) ) {
    path.reverse()

    path.forEach( function ( key ) {
      var nob = {}
      nob[key] = ob
      ob = nob
    } )
  }

  return ob
}


util.path = {}

util.path.normalize = function ( a ) {
  a = a.replace( /\/\//g, '/' )

  if ( a[0] == '/' && a.length > 1 )
    a = a.substr( 1 )

  if ( a[a.length - 1 ] != '/' )
    a = a+'/'

  return a
}

util.path.key = function ( a ) {
  a = a.split('/')
  a = a.filter( ( b ) => !!b )
  a = a.slice( a.length - 1 )
  a = a.join('')
  return a
}
