module.exports = loopinPatch
function loopinPatch() {
  const loopin = this
      , H = require('horten')
      , data = new H.Mutant()

  loopin.patch = patch
  loopin.patchGet = data.get.bind( data )

  function patch( value ) {
    const path = H.path.slice( arguments, 1 )

    data.patch( value, path )

    loopin.log( 'patch', H.path.resolve( path ), { data: value } )

    return loopin.hookAll( 'patch', value, path )

    // Old stuff
    loopin._patchStream.push( data )
  }

  loopin.patch.apply( loopin, arguments )

  return loopin.patch
}
