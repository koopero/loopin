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
