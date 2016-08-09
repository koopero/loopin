const path = exports

path.split = str =>
  str.split(/[\/\.]+/g)
  .filter( a => !!a )

path.flattenObject = function flattenObject( obj ) {

  return inner( obj )

  function inner( obj ) {
    const result = {}

    Object.keys(obj).forEach( function( key ) {
      const pathArr = path.split( key )
          , value = obj[ key ]

      if ( pathArr.length == 0 ) {

      } else if ( pathArr.length == 1 ) {
        result[ key ] = merge( result[ key ], value )
      } else {
        var last = pathArr.pop()
          , targ = walk( result, pathArr )

        targ[ last ] = merge( targ[ last ], value )
      }
    } )

    // console.log('inner', obj, result )

    return result
  }

  function walk( obj, keys ) {
    for ( var i = 0; i < keys.length; i ++ ) {
      var key = keys[i]
        , existing = obj[key]
        , existingType = typeof existing

      if ( existingType != 'object' ) {
        if ( existingType != 'undefined' ) {
          // Warning, blowing over primitive value.
        }
        obj = obj[key] = {}
      } else {
        obj = obj[key]
      }
    }

    return obj
  }

  function merge( a, b ) {
    const aType = typeof a
        , bType = typeof b
        , aOb = aType == 'object'
        , bOb = bType == 'object'

    if ( bOb )
      b = inner( b )

    // console.log( 'merge', a, b)

    if ( aType == 'undefined' )
      return b

    if ( aOb && bOb ) {
      _.merge( aOb, bOb )
      return aOb
    }


  }
}
