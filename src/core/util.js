const _ = require('lodash')


exports.wrapObjectInPath = function wrapObjectInPath( ob, path ) {
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


exports.path = {}

exports.path.normalize = function ( a ) {
  a = a.replace( /\/\//g, '/' )

  if ( a[0] == '/' && a.length > 1 )
    a = a.substr( 1 )

  if ( a[a.length - 1 ] != '/' )
    a = a+'/'

  return a
}

exports.path.key = function ( a ) {
  a = a.split('/')
  a = a.filter( ( b ) => !!b )
  a = a.slice( a.length - 1 )
  a = a.join('')
  return a
}
